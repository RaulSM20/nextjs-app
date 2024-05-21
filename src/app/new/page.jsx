import Link from "next/link";

function New() {
  return (
    <>
      <div className="flex items-start m-10 h-full justify-around gap-5">
        <button className="bg-gray-200 rounded text-black p-3 font-bold hover:border-2 hover:border-red-500 hover:bg-gray-300">
          <Link href="/new/newProduct">Create new Product</Link>
        </button>
        <button className="bg-gray-200 rounded text-black p-3 font-bold hover:border-2 hover:border-red-500 hover:bg-gray-300">
          <Link href="/new/newCategory">Create new Category</Link>
        </button>
      </div>
    </>
  );
}

export default New;
