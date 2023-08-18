import { addToCart, getCart, removeProductFromCart } from "./controller";

const MODULE_PATH = "/cart";

const cartRoutes = [
  {
    method: "get",
    path: `${MODULE_PATH}` as const,
    controllers: [getCart],
  },
  {
    method: "delete",
    path: `${MODULE_PATH}/:productId` as const,
    controllers: [removeProductFromCart],
  },
  {
    method: "post",
    path: `${MODULE_PATH}` as const,
    controllers: [addToCart],
  },
] as const;

export { cartRoutes };
