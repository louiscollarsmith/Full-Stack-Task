import { ProductDB } from "../../models/database/product";
import * as cartService from "./service";

const addToCart = (args: { body: ProductDB }) => {
  const { body: product } = args;

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
