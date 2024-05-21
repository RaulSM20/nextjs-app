import { ProductList } from "@/components/products/product-list";

function ProductPage() {
  return (
    <>
      <h2 className="text-5xl mt-10 text-center">ProductPage</h2>
      <div className="w-full flex flex-col gap-5 mt-3 justify-center">
        <ProductList></ProductList>
      </div>
    </>
  );
}

export default ProductPage;
