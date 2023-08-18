import * as cartModel from "../../models/database/cart";

const addToCart = (...args: Parameters<typeof cartModel["addToCart"]>) =>
  cartModel.addToCart(...args);

const getCart = (...args: Parameters<typeof cartModel["getCart"]>) =>
  cartModel.getCart(...args);

const removeProductFromCart = (
  ...args: Parameters<typeof cartModel["removeProductFromCart"]>
) => cartModel.removeProductFromCart(...args);

export { addToCart, removeProductFromCart, getCart };
