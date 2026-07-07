import cors from "cors";
import express from "express";
import config from "./config.js";
import orderRoutes from "./routes/order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

const app = express();

app.use(
  cors({
    origin: config.frontendUrl,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, env: config.duitkuEnv });
});

app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  return res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

app.listen(config.port, () => {
  console.log(`Calmee payment backend listening on http://localhost:${config.port}`);
});
