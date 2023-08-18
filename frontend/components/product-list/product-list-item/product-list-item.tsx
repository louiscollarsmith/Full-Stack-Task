import { ProductListProps } from "../product-list";

interface ProductListItemProps
  extends Pick<ProductListProps, "onProductClickHandler"> {
  product: ProductListProps["products"][number];
}

const ProductListItem: React.FC<ProductListItemProps> = (props) => {
  const { product, onProductClickHandler } = props;

  return (
    <article
      onClick={() => onProductClickHandler(product)}
      style={{
        cursor: "pointer",
        display: "flex",
        maxWidth: "40rem",
        padding: "1rem",
        backgroundColor: "#e0e4dd63",
        borderRadius: "5px",
        gap: "1rem",
      }}
    >
      <img style={{ width: "7rem" }} src={product.photoURL} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <b>{product.name}</b>
        <p style={{ margin: 0, padding: 0 }}>{product.description}</p>
      </div>
    </article>
  );
};

export { ProductListItem };
