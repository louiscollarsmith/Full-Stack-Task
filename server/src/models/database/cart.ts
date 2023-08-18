import type { ProductDB } from "./product";

interface CartDB {
  id: string;
  productsInCart: ProductDB[];
}

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

export { addToCart, removeProductFromCart, getCart };
