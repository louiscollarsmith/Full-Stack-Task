import { Router } from "express";

import { productRoutes } from "../modules/products/routes";

const getAppRouter = () => {
  const router = Router();

  const appRoutes = [...productRoutes];

  appRoutes.forEach((appRoute) => {
    router[appRoute.method](appRoute.path, async (req, res) => {
      const { body, params } = req;

      const { controllers } = appRoute;

      for (const controller of controllers) {
        const response = controller({ body, params });

        res.status(response.statusCode).json(response.response.data);
      }
    });
  });

  return router;
};

export { getAppRouter };
