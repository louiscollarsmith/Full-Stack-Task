import { Router } from "express";
import { productRoutes } from "../modules/products/routes";
import { cartRoutes } from "../modules/cart/routes";
import { z } from "zod";

const getAppRouter = () => {
  const router = Router();

  const appRoutes = [...productRoutes, ...cartRoutes];

  appRoutes.forEach((appRoute) => {
    router[appRoute.method](appRoute.path, async (req, res) => {
      try {
        const { body, params } = req;

        const { controllers } = appRoute;

        for (const controller of controllers) {
          /**
           * Duck typing with any to save time as other TS
           * setup is required to type this accurately
           *
           */
          const controllerResponse = await controller({
            body,
            params: params as any,
          });

          if (controllerResponse) {
            return res
              .status(controllerResponse.statusCode)
              .json(controllerResponse.response.data);
          }
        }

        /**
         * NOTE: This should never happen as the last controller should respond with a response
         */
        throw new Error(`All controllers returned empty response`);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({
            error: `Invalid data`,
            details: error.format(),
          });
        }

        res.status(500).json({
          error: `Unknown error occurred: ${error}`,
        });
      }
    });
  });

  return router;
};

export { getAppRouter };
