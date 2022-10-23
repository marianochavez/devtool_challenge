import type {Filter, Product} from "../../types";

import {FC, useState} from "react";

type Props = {
  onChange: (filter: Filter) => void;
};

const FilterPriceRange: FC<Props> = ({onChange}) => {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);

  function handleChangeMin(value: number) {
    if (value >= 0 && value <= max) {
      setMin(value);

      onChange(value ? (product: Product) => product.price >= value : null);
    }
  }

  function handleChangeMax(value: number) {
    if (value >= 0 && value >= min) {
      setMax(value);
      onChange(value ? (product: Product) => product.price <= value : null);
    }
  }

  return (
    <div className="flex flex-col ">
      <div className="p-2 ">
        <h3 className="font-bold text-white">Price:</h3>
        <div className="flex flex-row gap-2 my-2">
          <input
            className="rounded-sm w-16"
            min={0}
            type="number"
            value={min}
            onChange={(e) => handleChangeMin(Number(e.target.value))}
          />
          <p className="text-white font-bold">-</p>
          <input
            className="rounded-sm w-16"
            min={0}
            type="number"
            value={max}
            onChange={(e) => handleChangeMax(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPriceRange;
