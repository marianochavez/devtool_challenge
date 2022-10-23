import type {Filter} from "../../types";

import {FC, useMemo, useState} from "react";
import useSWR from "swr";

import {fetcher} from "../../api";

type Props = {
  onChange: (filter: Filter) => void;
};

const FilterColor: FC<Props> = ({onChange}) => {
  const {data: products} = useSWR("/products", fetcher);
  const [selected, setSelected] = useState<Set<string>>(() => new Set());

  const colors = useMemo(() => {
    const buffer: Set<string> = new Set();

    if (products) {
      for (let product of products) {
        buffer.add(product.color);
      }
    }

    return Array.from(buffer);
  }, [products]);

  function handleChange(color: string, isChecked: boolean) {
    const draft = structuredClone(selected);

    if (isChecked) {
      draft.add(color);
    } else {
      draft.delete(color);
    }

    onChange(draft.size ? (product) => draft.has(product.color) : null);
    setSelected(draft);
  }

  return (
    <div className="flex flex-col text-white border-t-2 border-white">
      <div className="p-2">
        <h3 className="font-bold">Colors:</h3>
        <ul>
          {colors.map((color) => (
            <li key={color}>
              <label htmlFor={color}>
                <input
                  className="mr-2"
                  id={color}
                  type="checkbox"
                  value={color}
                  onChange={(e) => handleChange(color, e.target.checked)}
                />
                {color}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterColor;
