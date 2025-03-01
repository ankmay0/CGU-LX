import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: {
      type: [String], // Store the image file paths
      default: [],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
