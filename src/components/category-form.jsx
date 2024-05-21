"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export const CategoryForm = () => {
  const [category, setCategory] = useState({
    name: "",
  });
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (params.id) {
      axios.get("/api/categories/" + params.id).then((res) => {
        setCategory({
          name: res.data.name,
        });
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!params.id) {
      const res = await axios.post("/api/categories", category);

      if (res.status === 201) {
        router.push("/categories");
        router.refresh();
      }
    } else {
      const res = await axios.put("/api/categories/" + params.id, category);

      if (res.status === 200) {
        router.push("/categories");
        router.refresh();
      }
    }
  };

  return (
    <div>
      <form
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <label className="text-black font-bold" htmlFor="name">
          Category name
        </label>
        <input
          className="border appearance-none rounded ml-5 border-black text-black"
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={category.name}
        />

        <button
          type="submit"
          className="bg-blue-500 p-1 rounded ml-5 hover:bg-blue-800 text-white font-bold"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};
