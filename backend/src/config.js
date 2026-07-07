import dotenv from "dotenv";

dotenv.config();

const config = {
  port: Number(process.env.PORT || 3001),
  duitkuMerchantCode: process.env.DUITKU_MERCHANT_CODE || "",
  duitkuApiKey: process.env.DUITKU_API_KEY || "",
  duitkuEnv: process.env.DUITKU_ENV || "sandbox",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  backendUrl: process.env.BACKEND_URL || "http://localhost:3001",
};

export function assertDuitkuConfig() {
  const missing = [];

  if (!config.duitkuMerchantCode) missing.push("DUITKU_MERCHANT_CODE");
  if (!config.duitkuApiKey) missing.push("DUITKU_API_KEY");

  if (missing.length > 0) {
    throw new Error(`Missing required Duitku env: ${missing.join(", ")}`);
  }
}

export default config;
