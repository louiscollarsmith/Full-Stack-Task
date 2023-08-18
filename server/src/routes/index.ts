import { Router } from "express";
import { productRoutes } from "../modules/products/routes";
import { cartRoutes } from "../modules/cart/routes";

const getAppRouter = () => {
  const router = Router();

  const appRoutes = [...productRoutes, ...cartRoutes];

  appRoutes.forEach((appRoute) => {
    router[appRoute.method](appRoute.path, async (req, res) => {
      const { body, params } = req;

      const { controllers } = appRoute;

      for (const controller of controllers) {
        /**
         * Duck typing with any to save time as other TS
         * setup is required to type this accurately
         *
         */
        const response = controller({ body, params: params as any });

        res.status(response.statusCode).json(response.response.data);
      }
    });
  });

  return router;
};

export { getAppRouter };
