"use client";

export const ProductCard = ({ id, name, description, image }) => {
  return (
    <>
      <div className="bg-gray-200 p-4 rounded-lg shadow-md w-1/2 flex flex-col text-center text-black mb-4 hover:bg-gray-300 hover:border-2 hover:border-red-500">
        <img src={image} alt="asds" />
        <h2 className="text-xl font-semibold">{name}</h2>
        <p>{description}</p>
      </div>
    </>
  );
};
