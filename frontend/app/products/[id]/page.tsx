"use client";

import { GetProductById } from "@/backend-services/product-management/rest-api";
import { Fetch } from "@/utils/api";
import { Button } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductProps {}

const Product = (props: ProductProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [product, setProduct] = useState<GetProductById.ApiResponseType>();

  useEffect(() => {
    const productId = pathname.split("/")[2];
    Fetch<GetProductById.ApiResponseType>(
      GetProductById.method,
      GetProductById.getUrl(productId)
    ).then((response) => setProduct(response));
  }, [pathname]);

  const back = (
    <Button
      onClick={() => {
        router.push("/");
      }}
    >
      Back
    </Button>
  );

  const header = (
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold">{product?.name}</h1>
      {back}
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
    <div className="flex flex-col w-[500px] py-12 space-y-4">
      {header}
      {image}
      {cart}
      {description}
    </div>
  );

  return <div className="flex justify-center h-screen w-full">{productEl}</div>;
};
export default Product;
