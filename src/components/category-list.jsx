"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CategoryCard } from "./category-card";
import Link from "next/link";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-5 mt-5">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.id}`}
          className="w-1/2 justify-center items-center flex"
        >
          <CategoryCard name={category.name} />
        </Link>
      ))}
    </div>
  );
};
