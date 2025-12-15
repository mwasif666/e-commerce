/**
 * Migration script: Copy existing 'image' field to 'images' array for all products
 * Run this once to update old products so they show up on the frontend
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModels.js";

dotenv.config();

const migrateImages = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Find all products that have an 'image' field but empty or missing 'images' array
    const products = await Product.find({
      $or: [
        { images: { $exists: false } },
        { images: { $size: 0 } },
        { images: null },
      ],
    });

    console.log(`Found ${products.length} products to migrate`);

    let updated = 0;
    for (const product of products) {
      if (product.image && product.image.trim() !== "") {
        // Copy single 'image' to 'images' array
        product.images = [product.image];
        await product.save();
        console.log(`✅ Updated: ${product.name} (${product._id})`);
        updated++;
      } else {
        console.log(`⏭️  Skipped: ${product.name} (no image field)`);
      }
    }

    console.log(`\nMigration complete! Updated ${updated} products.`);
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrateImages();
