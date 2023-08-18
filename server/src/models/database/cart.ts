import { z } from "zod";
import { ProductDBSchema, ProductDB } from "./product";

const CartSchema = z
  .object({
    id: z.string().nonempty(),
    productsInCart: ProductDBSchema.array(),
  })
  .strict();

interface CartDB extends z.infer<typeof CartSchema> {}

const mockCartDB: CartDB = {
  id: "someUniqueId",
  productsInCart: [],
};

const getCart = () => mockCartDB;

const addToCart = (product: ProductDB) => {
  mockCartDB.productsInCart.push(product);

  return mockCartDB;
};

const removeProductFromCart = (productId: ProductDB["id"]) => {
  const productIndexInCart = mockCartDB.productsInCart.findIndex(
    (productInCart) => productInCart.id === productId
  );

  if (productIndexInCart !== -1) {
    mockCartDB.productsInCart.splice(productIndexInCart, 1);
  }

  return mockCartDB;
};

export { CartSchema, addToCart, removeProductFromCart, getCart };
