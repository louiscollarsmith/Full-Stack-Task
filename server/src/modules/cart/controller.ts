import { ProductDB, ProductDBSchema } from "../../models/database/product";
import * as cartService from "./service";

const addToCart = async (args: { body: ProductDB }) => {
  const { body: product } = args;

  // Validate incoming data
  await ProductDBSchema.parseAsync(product);

  const updatedCart = cartService.addToCart(product);

  return {
    statusCode: 201,
    response: {
      type: "data",
      data: updatedCart,
    },
  };
};

const getCart = () => {
  const cart = cartService.getCart();

  return {
    statusCode: 200,
    response: {
      type: "data",
      data: cart,
    },
  };
};

const removeProductFromCart = (args: { params: { productId: string } }) => {
  const {
    params: { productId },
  } = args;

  const updatedCart = cartService.removeProductFromCart(productId);

  return {
    statusCode: 200,
    response: {
      type: "data",
      data: updatedCart,
    },
  };
};

export { addToCart, getCart, removeProductFromCart };
