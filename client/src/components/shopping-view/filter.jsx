import { filterOptions } from "@/config";
import { Fragment, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function ProductFilter({ filters, handleFilter, handleRangeFilter}) {

  const [priceRange, setPriceRange] = useState({
    min: filters.price?.min ?? "",
    max: filters.price?.max ?? "",
  });

  const [weightRange, setWeightRange] = useState({
    min: filters.weight?.min ?? "",
    max: filters.weight?.max ?? "",
  });

  const [skuRange, setSkuRange] = useState({
    min: filters.sku?.min ?? "",
    max: filters.sku?.max ?? "",
  });

  useEffect(() => {
  setPriceRange({
    min: filters.price?.min ?? "",
    max: filters.price?.max ?? "",
  });
}, [filters.price]);

  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {/* {filterOptions[keyItem].map((option) => (
                  <Label className="flex font-medium items-center gap-2 ">
                    <Checkbox
                    className={`flex`}
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))} */}
                {filterOptions[keyItem].map((option) => {
                  // Determine if all non-"all" options are selected
                  const allIds = filterOptions[keyItem].map(o => o.id).filter(id => id !== "all");
                  const selectedIds = filters[keyItem] || [];
                  const allSelected = allIds.every(id => selectedIds.includes(id));

                  // Compute checked state for this option
                  const checked = option.id === "all"
                    ? allSelected
                    : selectedIds.includes(option.id);

                  // Handler that toggles either all or a single option
                      const onChange = () => {
      if (option.id === "all") {
        if (allSelected) {
          // If everything is currently selected, clear all
          handleFilter(keyItem, [], true);
        } else {
          // Otherwise, select every option
          handleFilter(keyItem, allIds);
        }
      } else {
        // Toggle a single option
        handleFilter(keyItem, option.id);
      }
    };

                  return (
                    <Label key={option.id} className="flex font-medium items-center gap-2">
                      <Checkbox
                        className="flex"
                        checked={checked}
                        onCheckedChange={onChange}
                      />
                      {option.label}
                    </Label>
                  );
                })}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
      <h3 className="text-base ps-4 pe-4 pb-3 font-bold">Price Range <span className="font-medium text-sm">(Per Carat)</span></h3>
      <div className="flex flex-col ps-4 pe-4 gap-2">
        <div className="flex gap-2">
          <Label>Min:</Label>
        <Input
          type="number"
          value={priceRange.min}
          onChange={e =>
            setPriceRange(r => ({ ...r, min: e.target.value }))
          }
          placeholder="0"
          className="w-24"
        />
        </div>
        <div className="flex gap-2">
          <Label>Max:</Label>
        <Input
          type="number"
          value={priceRange.max}
          onChange={e =>
            setPriceRange(r => ({ ...r, max: e.target.value }))
          }
          placeholder="∞"
          className="w-24"
        />
        </div>
        {/* <Button
          size="sm"
          className={`mt-2 w-full`}
          onClick={() =>
            handleRangeFilter("price", priceRange.min, priceRange.max)
          }
        >
          Apply
        </Button> */}
        <div className="mt-2">
          <button className="button-19" onClick={() =>
            handleRangeFilter("price", priceRange.min, priceRange.max)
          } role="button">Apply</button>
        </div>
      </div>
      <div className="pe-4 ps-4 pt-4"><hr className="w-full border-t border-gray-300 dark:border-gray-600" /></div>
      <h3 className="text-base font-bold mt-5 ms-4 me-4">Weight Range</h3>
      <div className="flex flex-col ms-4 me-4">
        <div className="flex mt-2 gap-2">
          <Label>Min:</Label>
        <Input
          type="number"
          value={weightRange.min}
          onChange={e =>
            setWeightRange(r => ({ ...r, min: e.target.value }))
          }
          placeholder="0"
          className="w-24"
        />
        </div>
        <div className="flex mt-2 gap-2">
          <Label>Max:</Label>
        <Input
          type="number"
          value={weightRange.max}
          onChange={e =>
            setWeightRange(r => ({ ...r, max: e.target.value }))
          }
          placeholder="∞"
          className="w-24"
        />
        </div>
        {/* <Button
          size="sm"
          onClick={() =>
            handleRangeFilter("weight", weightRange.min, weightRange.max)
          }
        >
          Apply
        </Button> */}
        <div className="mt-4">
          <button className="button-19" onClick={() =>
            handleRangeFilter("weight", weightRange.min, weightRange.max)
          } role="button">Apply</button>
        </div>
      </div>
      <div className="pe-4 ps-4 pt-4"><hr className="w-full border-t border-gray-300 dark:border-gray-600" /></div>
      <h3 className="text-base font-bold pe-4 ps-4 mt-4">Sku Range</h3>
      <div className="flex flex-col ps-4 pe-4 gap-2">
        <div className="flex gap-2 mt-2">
          <Label>Min:</Label>
        <Input
          type="number"
          value={skuRange.min}
          onChange={e =>
            setSkuRange(r => ({ ...r, min: e.target.value }))
          }
          placeholder="0"
          className="w-24"
        />
        </div>
        <div className="flex gap-2">
          <Label>Max:</Label>
        <Input
          type="number"
          value={skuRange.max}
          onChange={e =>
            setSkuRange(r => ({ ...r, max: e.target.value }))
          }
          placeholder="∞"
          className="w-24"
        />
        </div>
        {/* <Button
          size="sm"
          onClick={() =>
            handleRangeFilter("sku", skuRange.min, skuRange.max)
          }
        >
          Apply
        </Button> */}
        <div className="mt-2">
          <button className="button-19" onClick={() =>
            handleRangeFilter("sku", skuRange.min, skuRange.max)
          } role="button">Apply</button>
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;