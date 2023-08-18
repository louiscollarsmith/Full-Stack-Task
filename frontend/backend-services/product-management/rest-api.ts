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
  const path = "/api/products";

  export const getUrl = (id: string) => `${path}/${id}`;

  export type ApiResponseType = ProductDB;
}

export { GetAllProducts, GetProductById };
