import { ProductDB, ProductSchema } from "../../models/database/product";
import * as productService from "./service";

const createProduct = async (args: { body: Omit<ProductDB, "id"> }) => {
  const { body } = args;

  // Validate the incoming data
  await ProductSchema.parseAsync(body);

  const insertedProduct = productService.createProduct(body);

  return {
    statusCode: 201,
    response: {
      type: "data",
      data: insertedProduct,
    },
  };
};

const getAllProducts = () => {
  const products = productService.getAllProducts();

  return {
    statusCode: 200,
    response: {
      type: "data",
      data: products,
    },
  };
};

const findProductById = (args: { params: { productId: string } }) => {
  const {
    params: { productId },
  } = args;

  const product = productService.findProductById(productId);

  return {
    statusCode: 200,
    response: {
      type: "data",
      data: product,
    },
  };
};

export { createProduct, getAllProducts, findProductById };
