import Link from "next/link";
import React from "react";

export const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold">
            Rsandez || Products and categories
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link href="/products" className="text-white hover:text-gray-300">
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="text-white hover:text-gray-300"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link href="/new" className="text-white hover:text-gray-300">
                Create
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
