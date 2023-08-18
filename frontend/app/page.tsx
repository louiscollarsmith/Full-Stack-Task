"use client";

import { Button } from "antd";
import { useEffect, useState } from "react";
import { Fetch } from "../utils/api";
import { GetAllProducts } from "@/backend-services/product-management/rest-api";

export default function Home() {
  const [products, setProducts] = useState<GetAllProducts.ApiResponseType>();

  useEffect(() => {
    Fetch<GetAllProducts.ApiResponseType>(
      GetAllProducts.method,
      GetAllProducts.getUrl()
    ).then((response) => setProducts(response));
  }, []);

  return (
    <main className="flex flex-col space-y-2 items-center justify-center w-full h-full p-24">
      <pre style={{ width: "250px", overflow: "scroll" }}>
        {JSON.stringify(products, null, 2)}
      </pre>
      <Button>Button</Button>
    </main>
  );
}
