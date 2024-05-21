import { Buttons } from "@/components/buttons";
import { ProductCard } from "@/components/products/product-card";
import axios from "axios";
import Link from "next/link";

async function loadProduct(productId) {
  const { data } = await axios.get(
    "http://localhost:3000/api/products/" + productId
  );

  return data;
}
async function ProductPage({ params }) {
  const product = await loadProduct(params.id);
  return (
    <>
      <h2 className="text-5xl mt-10 text-center">ProductPage</h2>
      <div className="w-1/2 flex flex-col items-center justify-center gap-12 mt-10">
        <Link href="/products">Go back to products</Link>
        <div className="w-full gap-4 flex flex-col items-center">
          <ProductCard
            name={product.name}
            description={product.description}
            image={product.image}
            isEdit={true}
            isDelete={true}
          ></ProductCard>
          <Buttons
            id={product.id}
            type="products"
            path="/products/edit/"
          ></Buttons>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
