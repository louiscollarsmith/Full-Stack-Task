"use client";

import { useEffect } from "react";
import { query } from "@/backend-services/product-management/rest-api";
import {
  ProductList,
  ProductListProps,
} from "@/components/product-list/product-list";
import { useRouter } from "next/navigation";
import Navigation from "@/components/navigation/Navigation";
import { useCallApi } from "@/hooks/use-call-api";

export default function Home() {
  const {
    data: products,
    error,
    loading,
    callApi: fetchAllProducts,
  } = useCallApi(query.getAllProducts);
  const router = useRouter();

  const onProductClickHandler: ProductListProps["onProductClickHandler"] = (
    product
  ) => {
    router.push(`/products/${product.id}`);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (error) {
      // Replace with popup
      alert(`Error fetching products: ${error}`);
    }
  }, [error]);

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
      {loading ? (
        <span>Loading products...</span>
      ) : (
        products && (
          <ProductList
            products={products}
            onProductClickHandler={onProductClickHandler}
          />
        )
      )}
    </div>
  );
}
