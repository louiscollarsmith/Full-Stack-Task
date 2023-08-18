import * as productsModel from "../../models/database/product";

const createProduct = (...args: Parameters<typeof productsModel.insert>) =>
  productsModel.insert(...args);

const getAllProducts = () => productsModel.findAll();

const findProductById = (...args: Parameters<typeof productsModel.findById>) =>
  productsModel.findById(...args);

export { createProduct, getAllProducts, findProductById };
