import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FilterSidebar = ({ selectedFilters, setSelectedFilters }) => {
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSelectedFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <aside className="w-full max-w-xs bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Filters</h2>
      <Accordion type="multiple">
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <label className="block">
              <input type="checkbox" name="Men" onChange={handleChange} className="mr-2" />
              Men
            </label>
            <label className="block">
              <input type="checkbox" name="Women" onChange={handleChange} className="mr-2" />
              Women
            </label>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <label className="block">
              <input type="checkbox" name="Under50" onChange={handleChange} className="mr-2" />
              Under $50
            </label>
            <label className="block">
              <input type="checkbox" name="Over50" onChange={handleChange} className="mr-2" />
              Over $50
            </label>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default FilterSidebar;
