import { GetAllProducts } from "@/backend-services/product-management/rest-api";
import { ProductListItem } from "./product-list-item/product-list-item";

interface ProductListProps {
  products: GetAllProducts.ApiResponseType;
  onProductClickHandler: (
    product: GetAllProducts.ApiResponseType[number]
  ) => void;
}

const ProductList: React.FC<ProductListProps> = (props) => {
  const { products, onProductClickHandler: onProductClick } = props;

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "800px",
        gap: "2rem",
      }}
    >
      {products.map((product) => (
        <ProductListItem
          key={product.id}
          product={product}
          onProductClickHandler={onProductClick}
        />
      ))}
    </section>
  );
};

export type { ProductListProps };
export { ProductList };
