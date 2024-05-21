"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ProductCard } from "./product-card";
import Link from "next/link";
import { json2csv } from "json-2-csv";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchProducts();
  }, []);

  const downloadCSV = async () => {
    const csv = await json2csv(products);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();
  };

  return (
    <>
      <button className="text-white  font-bold " onClick={downloadCSV}>
        {" "}
        Download CSV
      </button>
      <div className="w-full flex items-center gap-5 mt-5">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="w-1/2 justify-center items-center flex"
          >
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              image={product.image}
            />
          </Link>
        ))}
      </div>
    </>
  );
};
