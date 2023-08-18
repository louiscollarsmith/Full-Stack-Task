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
  const path = "/products";

  export const getUrl = () => path;

  export type ApiResponseType = ProductDB[];
}

export { GetAllProducts };
