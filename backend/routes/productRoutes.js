import express from "express";
import multer from "multer";
import {
  create,
  getProduct,
  editproduct,
  deleteProduct,
  getProductById,
} from "../controllers/productControllers.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/create", upload.array("images", 10), create);
router.get("/getAll", getProduct);
router.get("/getSingle/:id", getProductById);
router.put("/update/:id", editproduct);
router.delete("/delete/:id", deleteProduct);

export default router;
