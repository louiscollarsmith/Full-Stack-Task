import { Fetch } from "@/utils/api";
import { UrlToParamObj } from "@/utils/rest-api/types/utils";

interface ProductDB {
  id: string;
  sku: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  photoURL: string;
}

namespace GetAllProducts {
  export const method = "GET";
  const path = "/api/products";

  export const getUrl = () => path;

  export type ApiResponseType = ProductDB[];
}

namespace GetProductById {
  export const method = "GET";
  const path = "/api/products/:productId";

  export type ParamsObjType = UrlToParamObj<typeof path>;

  export const getUrl = (paramsObj: ParamsObjType) =>
    path.replace(":productId", paramsObj.productId);

  export type ApiResponseType = ProductDB | undefined;
}

const query = {
  getAllProducts: async (): Promise<GetAllProducts.ApiResponseType> => {
    const products = await Fetch<GetAllProducts.ApiResponseType>(
      GetAllProducts.method,
      GetAllProducts.getUrl()
    );

    return products;
  },

  getProductById: async (
    paramsObj: GetProductById.ParamsObjType
  ): Promise<GetProductById.ApiResponseType> => {
    const product = await Fetch<GetProductById.ApiResponseType>(
      GetProductById.method,
      GetProductById.getUrl(paramsObj)
    );

    return product;
  },
} as const;

export { GetAllProducts, GetProductById, query };
