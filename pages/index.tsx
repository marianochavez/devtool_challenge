import type {NextPage} from "next";
import type {Category, Filter, Filters, Product} from "../types";

import {useState} from "react";

import CategorySection from "../components/CategorySection";
import FilterColor from "../components/Filters/FilterColor";
import FilterRating from "../components/Filters/FilterRating";
import FilterPriceRange from "../components/Filters/FilterPriceRange";
import ProductSection from "../components/ProductSection";
import ProductPagination from "../components/ProductPagination";

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [category, setCategory] = useState<Category | null>(null);
  const [filters, setFilters] = useState<Filters>({
    price: null,
    color: null,
    rating: null,
  });

  return (
    <main className="px-2 bg-gray-700 min-w-screen min-h-screen">
      <CategorySection onClick={setCategory} />
      <section className="flex flex-row">
        <aside className="mr-2">
          <div className=" border-2 border-white rounded-lg">
            <FilterPriceRange
              onChange={(filter: Filter) => setFilters((filters) => ({...filters, price: filter}))}
            />
            <FilterColor
              onChange={(filter: Filter) => setFilters((filters) => ({...filters, color: filter}))}
            />
            <FilterRating
              onChange={(filter: Filter) => setFilters((filters) => ({...filters, rating: filter}))}
            />
          </div>
        </aside>
        <div className="flex flex-col flex-1">
          <ProductSection
            category={category}
            filters={filters}
            page={pageIndex}
            onChange={(products: Product[]) => setProducts(products)}
          />
          <ProductPagination
            page={pageIndex}
            products={products}
            onClick={(page: number) => setPageIndex(page)}
          />
        </div>
      </section>
    </main>
  );
};

// export const getStaticProps: GetStaticProps<Props> = async () => {
//   const products = await api.product.list();
//   const categories = await api.category.list();

//   return {
//     props: {
//       products,
//       categories,
//     },
//   };
// };

export default Home;
