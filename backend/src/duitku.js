import crypto from "node:crypto";
import config, { assertDuitkuConfig } from "./config.js";

const createInvoiceEndpoints = {
  sandbox: "https://api-sandbox.duitku.com/api/merchant/createInvoice",
  production: "https://api-prod.duitku.com/api/merchant/createInvoice",
};

function hmacSha256Hex(value, key) {
  return crypto.createHmac("sha256", key).update(value).digest("hex");
}

export function createInvoiceSignature(timestamp) {
  assertDuitkuConfig();
  return hmacSha256Hex(`${config.duitkuMerchantCode}${timestamp}`, config.duitkuApiKey);
}

export function createCallbackSignature({ merchantCode, amount, merchantOrderId }) {
  assertDuitkuConfig();
  return hmacSha256Hex(`${merchantCode}${amount}${merchantOrderId}`, config.duitkuApiKey);
}

export function verifyCallbackSignature(payload) {
  const expectedSignature = createCallbackSignature({
    merchantCode: payload.merchantCode,
    amount: payload.amount,
    merchantOrderId: payload.merchantOrderId,
  });

  const receivedSignature = String(payload.signature || "");

  if (!receivedSignature || receivedSignature.length !== expectedSignature.length) {
    return false;
  }

  return crypto.timingSafeEqual(
    Buffer.from(receivedSignature, "utf8"),
    Buffer.from(expectedSignature, "utf8")
  );
}

export async function createDuitkuTransaction({ order, customer }) {
  assertDuitkuConfig();

  const timestamp = Date.now().toString();
  const signature = createInvoiceSignature(timestamp);
  const endpoint = createInvoiceEndpoints[config.duitkuEnv] || createInvoiceEndpoints.sandbox;

  const payload = {
    paymentAmount: order.amount,
    merchantOrderId: order.merchantOrderId,
    productDetails: order.productName,
    additionalParam: "",
    merchantUserInfo: customer.email,
    paymentMethod: "",
    customerVaName: customer.customerName,
    email: customer.email,
    phoneNumber: customer.phone,
    itemDetails: [
      {
        name: order.productName,
        price: order.amount,
        quantity: 1,
      },
    ],
    customerDetail: {
      firstName: customer.customerName,
      email: customer.email,
      phoneNumber: customer.phone,
    },
    callbackUrl: `${config.backendUrl}/api/payment/callback`,
    returnUrl: `${config.frontendUrl}/payment/return?merchantOrderId=${encodeURIComponent(
      order.merchantOrderId
    )}`,
    expiryPeriod: 60,
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-duitku-signature": signature,
      "x-duitku-timestamp": timestamp,
      "x-duitku-merchantcode": config.duitkuMerchantCode,
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();
  let data;

  try {
    data = JSON.parse(responseText);
  } catch {
    data = { raw: responseText };
  }

  if (!response.ok || data.statusCode !== "00") {
    const message = data.statusMessage || data.Message || responseText || "Duitku request failed";
    throw new Error(message);
  }

  return data;
}
