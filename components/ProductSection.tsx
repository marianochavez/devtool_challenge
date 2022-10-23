import type {Category, Filters, Product} from "../types";

import {FC, useEffect, useMemo} from "react";
import useSWR from "swr";

import {fetcher} from "../api";

import ProductCard from "./ProductCard";

type Props = {
  filters: Filters;
  category: Category | undefined;
  page: number;
  onChange: (products: Product[]) => void;
};

const ProductSection: FC<Props> = ({filters, category, page, onChange}) => {
  const {data: products, error} = useSWR(`/products?_limit=9&_page=${page}`, fetcher);

  const matches = useMemo(() => {
    const filtersToApply = Object.values(filters).filter(Boolean);
    let matches: Product[] = products;

    matches = category ? matches.filter((product) => product.categoryId === category?.id) : matches;

    for (let filter of filtersToApply) {
      matches = matches.filter(filter!);
    }

    return matches;
  }, [category, products, filters]);

  useEffect(() => {
    onChange(matches);
  }, [matches, onChange]);

  return (
    <article className="grid grid-cols-3 gap-4 ">
      {!products && !error ? (
        <p>Loading...</p>
      ) : (
        matches.map((product) => <ProductCard key={product.id} product={product} />)
      )}
    </article>
  );
};

export default ProductSection;
