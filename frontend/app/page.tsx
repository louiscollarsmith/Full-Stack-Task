"use client";

import { Button } from "antd";
import { useEffect, useState } from "react";
import { Fetch } from "../utils/api";
import { GetAllProducts } from "@/backend-services/product-management/rest-api";
import {
  ProductList,
  ProductListProps,
} from "@/components/product-list/product-list";
import { useRouter } from "next/navigation";

export default function Home() {
  const [products, setProducts] = useState<GetAllProducts.ApiResponseType>();
  const router = useRouter();

  const onProductClickHandler: ProductListProps["onProductClickHandler"] = (
    product
  ) => {
    router.push(`/products/${product.id}`);
  };

  useEffect(() => {
    Fetch<GetAllProducts.ApiResponseType>(
      GetAllProducts.method,
      GetAllProducts.getUrl()
    ).then((response) => setProducts(response));
  }, []);

  return (
    <main className="flex flex-col space-y-2 items-center justify-center w-full h-full p-24">
      <h2 style={{ fontWeight: "bold" }}>
        <u>Products List</u>
      </h2>
      {products && (
        <ProductList
          products={products}
          onProductClickHandler={onProductClickHandler}
        />
      )}
    </main>
  );
}
