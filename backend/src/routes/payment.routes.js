import express from "express";
import config from "../config.js";
import { createDuitkuTransaction, verifyCallbackSignature } from "../duitku.js";
import { createOrder, getOrder, updateOrder } from "../orders.store.js";
import { findPackageById } from "../packages.js";

const router = express.Router();

function generateMerchantOrderId() {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `CALMEE-${Date.now()}-${random}`;
}

function normalizeCheckoutBody(body) {
  return {
    packageId: String(body.packageId || "").trim(),
    customerName: String(body.customerName || "").trim(),
    email: String(body.email || "").trim().toLowerCase(),
    phone: String(body.phone || "").trim(),
  };
}

function validateCheckoutBody(body) {
  const errors = [];

  if (!body.packageId) errors.push("packageId is required");
  if (!body.customerName) errors.push("customerName is required");
  if (!body.email) errors.push("email is required");
  if (!body.phone) errors.push("phone is required");

  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push("email is invalid");
  }

  return errors;
}

function mapCallbackStatus(payload) {
  if (payload.resultCode === "00") return "paid";

  const text = [
    payload.resultCode,
    payload.transactionState,
    payload.transactionStateStatus,
    payload.bankRespMsg,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (text.includes("expire") || text.includes("expired") || text.includes("kedaluwarsa")) {
    return "expired";
  }

  return "failed";
}

router.post("/create", async (req, res, next) => {
  try {
    const body = normalizeCheckoutBody(req.body);
    const errors = validateCheckoutBody(body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid checkout data",
        errors,
      });
    }

    const selectedPackage = findPackageById(body.packageId);

    if (!selectedPackage) {
      return res.status(400).json({
        success: false,
        message: "Unknown packageId",
      });
    }

    const now = new Date().toISOString();
    const order = await createOrder({
      merchantOrderId: generateMerchantOrderId(),
      packageId: selectedPackage.id,
      productName: selectedPackage.productName,
      amount: selectedPackage.amount,
      status: "pending",
      reference: null,
      customer: {
        customerName: body.customerName,
        email: body.email,
        phone: body.phone,
      },
      callbackEvents: [],
      createdAt: now,
      updatedAt: now,
      paidAt: null,
    });

    const duitkuTransaction = await createDuitkuTransaction({
      order,
      customer: body,
    });

    const updatedOrder = await updateOrder(order.merchantOrderId, {
      reference: duitkuTransaction.reference || null,
      duitkuCreateResponse: duitkuTransaction,
    });

    return res.json({
      success: true,
      merchantOrderId: updatedOrder.merchantOrderId,
      reference: updatedOrder.reference,
      paymentUrl: duitkuTransaction.paymentUrl,
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/callback", async (req, res, next) => {
  try {
    const payload = req.body || {};
    const requiredFields = ["merchantCode", "amount", "merchantOrderId", "signature"];
    const missingFields = requiredFields.filter((field) => !payload[field]);

    if (missingFields.length > 0) {
      return res.status(400).send("Bad Parameter");
    }

    if (payload.merchantCode !== config.duitkuMerchantCode) {
      return res.status(400).send("Invalid Merchant");
    }

    const isValidSignature = verifyCallbackSignature(payload);

    if (!isValidSignature) {
      return res.status(400).send("Bad Signature");
    }

    const order = await getOrder(payload.merchantOrderId);

    if (!order) {
      return res.status(404).send("Order Not Found");
    }

    const nextStatus = mapCallbackStatus(payload);
    const callbackEvent = {
      receivedAt: new Date().toISOString(),
      payload,
    };

    await updateOrder(order.merchantOrderId, (currentOrder) => {
      const callbackEvents = [...(currentOrder.callbackEvents || []), callbackEvent];

      if (currentOrder.status === "paid") {
        return {
          callbackEvents,
          reference: currentOrder.reference || payload.reference || null,
        };
      }

      return {
        status: nextStatus,
        reference: payload.reference || currentOrder.reference || null,
        paidAt: nextStatus === "paid" ? new Date().toISOString() : currentOrder.paidAt,
        callbackEvents,
      };
    });

    return res.status(200).send("OK");
  } catch (error) {
    return next(error);
  }
});

export default router;
