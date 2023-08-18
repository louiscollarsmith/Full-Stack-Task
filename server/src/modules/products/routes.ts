import { createProduct, getAllProducts, findProductById } from "./controller";

const MODULE_PATH = "/products";

const productRoutes = [
  {
    method: "get",
    path: `${MODULE_PATH}` as const,
    controllers: [getAllProducts],
  },
  {
    method: "get",
    path: `${MODULE_PATH}/:productId` as const,
    controllers: [findProductById],
  },
  {
    method: "post",
    path: `${MODULE_PATH}` as const,
    controllers: [createProduct],
  },
] as const;

export { productRoutes };
