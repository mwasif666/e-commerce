import e from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import ProductRoutes from "./routes/productRoutes.js";
import UserRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = e();

app.use(cors());
app.use(bodyParser.json());

// ⭐ Serve Uploads Folder Publicly
app.use("/uploads", e.static("uploads"));

const PORT = process.env.PORT || 8000;
const MONGO = process.env.MONGO_URL;

mongoose
  .connect(MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

app.use("/api", ProductRoutes);
app.use("/api", UserRoutes);
