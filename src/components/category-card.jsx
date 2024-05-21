"use client";

export const CategoryCard = ({ name }) => {
  return (
    <>
      <div className="bg-gray-200 p-4 rounded-lg shadow-md w-1/4 text-center text-black mb-4 hover:bg-gray-300 hover:border-2 hover:border-red-500">
        <h2 className="text-xl font-semibold">{name}</h2>
      </div>
    </>
  );
};
