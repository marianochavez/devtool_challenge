import type {Filter} from "../../types";

import {FC, useState} from "react";

type Props = {
  onChange: (filter: Filter) => void;
};

const FilterRating: FC<Props> = ({onChange}) => {
  const [selected, setSelected] = useState<Set<number>>(() => new Set());

  function handleChange(rating: number, isChecked: boolean) {
    const draft = structuredClone(selected);

    if (isChecked) {
      draft.add(rating);
    } else {
      draft.delete(rating);
    }

    onChange(draft.size ? (product) => draft.has(product.rating) : null);
    setSelected(draft);
  }

  return (
    <div className="flex flex-col text-white border-t-2 border-white">
      <div className="p-2">
        <h3 className="font-bold">Rating:</h3>
        <ul>
          {[5, 4, 3, 2, 1].map((rating) => (
            <li key={rating}>
              <label htmlFor={String(rating)}>
                <input
                  className="mr-2"
                  id={String(rating)}
                  type="checkbox"
                  value={rating}
                  onChange={(e) => handleChange(rating, e.target.checked)}
                />
                {"★".repeat(rating).padEnd(5, "☆")}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterRating;
