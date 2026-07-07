import express from "express";
import { getOrder } from "../orders.store.js";

const router = express.Router();

router.get("/:merchantOrderId", async (req, res, next) => {
  try {
    const order = await getOrder(req.params.merchantOrderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.json({
      merchantOrderId: order.merchantOrderId,
      packageId: order.packageId,
      productName: order.productName,
      amount: order.amount,
      status: order.status,
      reference: order.reference,
      createdAt: order.createdAt,
      paidAt: order.paidAt,
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
