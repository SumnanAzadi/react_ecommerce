import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
dotenv.config();
connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;
app.listen(PORT, console.log(`Server running in ${ENV} mode on port ${PORT}`));
