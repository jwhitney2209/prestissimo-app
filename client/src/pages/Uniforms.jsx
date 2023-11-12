import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_UNIFORMS } from "../utils/queries";

import Spinner from "../components/Spinner";
import UniformTable from "../components/UniformTable";
export default function Uniforms() {
  useEffect(() => {
    document.title = "Uniforms";
  }, []);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { loading, error, data } = useQuery(GET_UNIFORMS);

  const uniforms = data?.getUniforms || [];

  const uniformCategories = (uniforms) => {
    const categories = [];
    uniforms.forEach((uniform) => {
      if (!categories.includes(uniform.category)) {
        categories.push(uniform.category);
      }
    });
    return categories;
  };

  const filteredUniforms = uniforms.filter(
    (uniform) => uniform.category === selectedCategory
  );

  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;

  return (
    <>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Uniforms
        </h3>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <a
            href="/add-uniform"
            type="button"
            className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
          >
            Add New Uniform
          </a>
        </div>
      </div>
      {!loading && !error && (
        <>
          <div className="mt-8">
            {!selectedCategory && (
              <>
                <h1 htmlFor="category" className="text-md font-semibold mb-4">
                  Select a category to view uniforms
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {uniformCategories(uniforms).map((category) => (
                    <button
                      type="button"
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="rounded-md bg-gray-900 hover:bg-gray-700 text-white py-2.5"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </>
            )}
            {selectedCategory && (
              <UniformTable
                uniforms={filteredUniforms}
                category={selectedCategory}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
