"use client";

import { query } from "@/backend-services/product-management/rest-api";
import Navigation from "@/components/navigation/Navigation";
import { useCallApi } from "@/hooks/use-call-api";
import { Button } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProductProps {}

const Product = (props: ProductProps) => {
  const {
    data: product,
    error,
    loading,
    callApi: fetchProductById,
  } = useCallApi(query.getProductById);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const productId = pathname.split("/")[2];
    fetchProductById({ productId });
  }, [pathname]);

  useEffect(() => {
    if (error) {
      // Replace with popup
      alert(`Error fetching product details: ${error}`);
    }
  }, [error]);

  const onHomeClick = () => {
    router.push("/");
  };
  const onCartClick = () => {
    router.push("/cart");
  };

  const navigation = <Navigation onCartClick={onCartClick} />;

  const home = <Button onClick={onHomeClick}>Home</Button>;

  const header = (
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold">{product?.name}</h1>
      {home}
    </div>
  );

  const image = <img src={product?.photoURL}></img>;

  const description = <span>{product?.description}</span>;
  const price = (
    <span className="font-bold text-xl">{`£${product?.price}`}</span>
  );
  const addToCart = <Button>Add to Cart</Button>;
  const cart = (
    <div className="flex justify-between">
      {price}
      {addToCart}
    </div>
  );

  const productEl = product && (
    <div className="flex flex-col w-[500px] py-2 space-y-4">
      {header}
      {image}
      {cart}
      {description}
    </div>
  );

  return (
    <div className="flex flex-col items-center h-screen space-y-4 w-full">
      {navigation}
      {loading ? <span>Loading product details...</span> : productEl}
    </div>
  );
};
export default Product;
