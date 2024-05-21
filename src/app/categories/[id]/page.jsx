import { Buttons } from "@/components/buttons";
import { CategoryCard } from "@/components/category-card";
import axios from "axios";
import Link from "next/link";

async function loadProduct(categoryId) {
  const { data } = await axios.get(
    "http://localhost:3000/api/categories/" + categoryId
  );

  return data;
}
async function CategoryPage({ params }) {
  const category = await loadProduct(params.id);
  return (
    <>
      <h2 className="text-5xl mt-10 text-center">CategoryPage</h2>
      <div className="w-1/2 flex flex-col items-center justify-center gap-12 mt-10">
        <Link href="/categories">Go back to Categories</Link>
        <div className="w-full gap-4 flex flex-col items-center">
          <CategoryCard
            name={category.name}
            isEdit={true}
            isDelete={true}
          ></CategoryCard>
          <Buttons
            id={category.id}
            type="categories"
            path="/categories/edit/"
          ></Buttons>
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
