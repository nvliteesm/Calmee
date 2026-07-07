import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, "../data");
const ordersFile = path.join(dataDir, "orders.json");

async function ensureStore() {
  await mkdir(dataDir, { recursive: true });

  try {
    await readFile(ordersFile, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    await writeFile(ordersFile, JSON.stringify({ orders: [] }, null, 2));
  }
}

async function readStore() {
  await ensureStore();
  const raw = await readFile(ordersFile, "utf8");
  return JSON.parse(raw || '{"orders":[]}');
}

async function writeStore(store) {
  await ensureStore();
  await writeFile(ordersFile, JSON.stringify(store, null, 2));
}

export async function createOrder(order) {
  const store = await readStore();
  store.orders.push(order);
  await writeStore(store);
  return order;
}

export async function getOrder(merchantOrderId) {
  const store = await readStore();
  return store.orders.find((order) => order.merchantOrderId === merchantOrderId) || null;
}

export async function updateOrder(merchantOrderId, updater) {
  const store = await readStore();
  const index = store.orders.findIndex((order) => order.merchantOrderId === merchantOrderId);

  if (index === -1) return null;

  const currentOrder = store.orders[index];
  const nextOrder = typeof updater === "function" ? updater(currentOrder) : updater;

  store.orders[index] = {
    ...currentOrder,
    ...nextOrder,
    updatedAt: new Date().toISOString(),
  };

  await writeStore(store);
  return store.orders[index];
}
