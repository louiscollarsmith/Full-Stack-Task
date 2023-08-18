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
import Navigation from "@/components/navigation/Navigation";

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

  const onCartClick = () => {
    router.push("/cart");
  };

  const navigation = <Navigation onCartClick={onCartClick} />;

  return (
    <div className="flex flex-col items-center h-screen space-y-4 w-full">
      {navigation}
      <h2 style={{ fontWeight: "bold" }}>
        <u>Products List</u>
      </h2>
      {products && (
        <ProductList
          products={products}
          onProductClickHandler={onProductClickHandler}
        />
      )}
    </div>
  );
}
