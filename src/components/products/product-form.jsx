"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    Category: "",
    image: "",
  });

  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState();
  const router = useRouter();
  const param = useParams();

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

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFile(e.target.files[0]);
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  useEffect(() => {
    if (param.id) {
      axios.get("/api/products/" + param.id).then((res) => {
        setProduct({
          name: res.data.name,
          description: res.data.description,
          Category: res.data.Category.id,
        });
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación del formulario
    if (!file || !product.name || !product.description || !product.Category) {
      console.log("Por favor complete todos los campos");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("Category", product.Category);
    formData.append("image", file);

    try {
      // POST
      if (!param.id) {
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        const res = await axios.post("/api/products", formData, config);

        if (res.status === 201) {
          console.log("Producto creado exitosamente");
          router.push("/products");
          router.refresh();
        }
      } else {
        // PUT
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };

        const res = await axios.put(
          "/api/products/" + param.id,
          formData,
          config
        );

        if (res.status === 200) {
          console.log("Producto actualizado exitosamente");
          router.push("/products");
          router.refresh();
        }
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div>
      <form
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-start mb-3">
          <label className="text-black font-bold" htmlFor="name">
            Product name
          </label>
          <input
            className="border appearance-none rounded ml-5 border-black text-black"
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={product.name}
          />
        </div>
        <div className="flex flex-col items-start mb-3">
          <label className="text-black font-bold" htmlFor="description">
            Description
          </label>
          <input
            className="border appearance-none rounded ml-5 border-black text-black"
            type="text"
            id="description"
            name="description"
            onChange={handleChange}
            value={product.description}
          />
        </div>
        <div className="flex flex-col items-start mb-3">
          <label className="text-black font-bold" htmlFor="description">
            Product image
          </label>
          <input
            className="border appearance-none rounded ml-5 border-black text-black"
            type="file"
            name="image"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </div>

        <div className="flex flex-col items-start mb-3">
          <label className="text-black font-bold" htmlFor="category">
            Category
          </label>
          <select
            className="border appearance-none rounded ml-5 border-black text-black"
            id="category"
            name="Category"
            onChange={handleChange}
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 p-1 rounded ml-5 hover:bg-blue-800 text-white font-bold"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};
