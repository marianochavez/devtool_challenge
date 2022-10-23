import type {Product} from "../types";

import {FC} from "react";

type Props = {
  product: Product;
};

const ProductCard: FC<Props> = ({product}) => {
  return (
    <div className="p-5 border-white border-2 bg-slate-500 text-white rounded-lg ">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={product.name} className="rounded-sm" src={product.image} />
        <div className="flex flex-col my-2 items-center">
          <h3>{product.name}</h3>
          <p>{"★".repeat(product.rating).padEnd(5, "☆")}</p>
          <p>{product.price.toLocaleString("es-AR", {style: "currency", currency: "ARS"})}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
