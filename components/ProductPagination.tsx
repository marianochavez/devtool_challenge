import type {Product} from "../types";

import {FC} from "react";

type Props = {
  page: number;
  products: Product[];
  onClick: (page: number) => void;
};

const ProductPagination: FC<Props> = ({page, products, onClick}) => {
  function handlePrevPage() {
    if (page <= 0) return;
    onClick(page - 1);
  }

  function handleNextPage() {
    onClick(page + 1);
  }

  return (
    <div className="flex flex-row w-full items-center mt-2 gap-2 justify-center">
      <button
        className="p-2 text-white border-2 border-white rounded-lg"
        disabled={page <= 0}
        onClick={handlePrevPage}
      >{`<`}</button>
      <p className=" font-bold p-2 text-white ">{page + 1}</p>
      <button
        className="p-2 text-white border-2 border-white rounded-lg"
        disabled={products?.length < 9}
        onClick={handleNextPage}
      >{`>`}</button>
    </div>
  );
};

export default ProductPagination;
