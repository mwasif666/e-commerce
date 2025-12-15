import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    // Keep a single image field for backward-compatibility if needed
    image: {
      type: String,
      required: false,
    },
    // Store multiple uploaded image filenames here
    images: {
      type: [String],
      required: false,
      default: [],
    },
    brand: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    countInStock: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    numReviews: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
