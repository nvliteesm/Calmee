const API_BASE_URL = import.meta.env.VITE_PAYMENT_API_URL || "http://localhost:3001";

async function parseJsonResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Payment request failed");
  }

  return data;
}

export async function createPayment(payload) {
  const response = await fetch(`${API_BASE_URL}/api/payment/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseJsonResponse(response);
}

export async function getOrderStatus(merchantOrderId) {
  const response = await fetch(
    `${API_BASE_URL}/api/orders/${encodeURIComponent(merchantOrderId)}`
  );

  return parseJsonResponse(response);
}
