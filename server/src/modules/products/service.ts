import * as productsModel from "../../models/database/product";

const createProduct = (productToCreate: Omit<productsModel.ProductDB, "id">) =>
  productsModel.insert(productToCreate);

const getAllProducts = () => productsModel.findAll();

const findProductById = (...args: Parameters<typeof productsModel.findById>) =>
  productsModel.findById(...args);

export { createProduct, getAllProducts, findProductById };
