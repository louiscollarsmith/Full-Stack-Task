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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "15rem",
          height: "8rem",
        }}
      >
        <img style={{ width: "100%", height: "100%" }} src={product.photoURL} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <b>{product.name}</b>
        <b>
          {product.price} {product.currency}
        </b>
        <p
          style={{
            margin: 0,
            padding: 0,
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            display: "-webkit-box",
            overflow: "hidden",
            lineHeight: "normal",
          }}
        >
          {product.description}
        </p>
      </div>
    </article>
  );
};

export { ProductListItem };
