import Product from "../models/productModels.js";

export const create = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const imageData = { name, description, images: [], price, category };

    if (req.files && req.files.length > 0) {
      const imgpath = req.files.map((file) => `/uploads/${file.filename}`);
      imageData.images = imgpath;
    }
    const newProduct = new Product(imageData);
    const saveProduct = await newProduct.save();
    return res.status(201).json(saveProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findOne(id);
    if (!Product) {
      return res.status(404).jon({ message: "Product not found" });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateproduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateproduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Product deleted successfully", data: deletedProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
