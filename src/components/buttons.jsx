"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Buttons = ({ id, type, path }) => {
  const router = useRouter();

  return (
    <div className="flex gap-4">
      <button
        onClick={async () => {
          if (confirm("Are you sure you want to delete this product?")) {
            const res = await axios.delete(
              "http://localhost:3000/api/" + type + "/" + id
            );
            if (res.status === 200) {
              alert("Product deleted successfully");
              router.push("/products");
              router.refresh();
            }
          }
        }}
        className="border-2 rounded p-2 bg-red-500"
      >
        Delete
      </button>
      <button className="border-2 rounded p-2 bg-blue-600">
        <Link href={path + id}>Edit</Link>
      </button>
    </div>
  );
};
