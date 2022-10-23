import type {Category} from "../types";

import {FC} from "react";
import useSWR from "swr";

import {fetcher} from "../api";

type Props = {
  onClick: (category: Category) => void;
};
const CategorySection: FC<Props> = ({onClick}) => {
  const {data: categories, error} = useSWR("/categories", fetcher);

  return (
    <div className="flex flex-row gap-5 py-5 justify-center">
      {!categories && !error ? (
        <p>Loading...</p>
      ) : (
        categories.map((category: Category) => (
          <div
            key={category.id}
            className="w-20 flex justify-center border-2 py-2 px-3 bg-amber-100 rounded-lg border-white hover:bg-white cursor-pointer"
            onClick={() => onClick(category)}
          >
            <p>{category.name}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CategorySection;
