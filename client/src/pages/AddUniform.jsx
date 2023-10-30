import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_UNIFORM, ADD_UNIFORM_CATEGORY } from "../utils/mutations";
import { GET_UNIFORM_CATEGORIES, GET_UNIFORMS } from "../utils/queries";
import { XMarkIcon } from "@heroicons/react/20/solid";

import Spinner from "../components/Spinner";

export default function AddUniform() {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({});

  const [addUniformCategory] = useMutation(ADD_UNIFORM_CATEGORY, {
    variables: { categoryName },
    refetchQueries: [{ query: GET_UNIFORM_CATEGORIES }],
  });

  const [addUniform] = useMutation(ADD_UNIFORM, {
    variables: { ...formData },
    refetchQueries: [{ query: GET_UNIFORMS }],
  });

  const { loading, data } = useQuery(GET_UNIFORM_CATEGORIES);

  const categories = data?.getUniformCategories || [];

  if (loading) {
    return <Spinner />;
  }

  // useQuery hook to make query request

  const handleUniformCategorySubmit = (event) => {
    event.preventDefault();
    if (!categoryName) {
      setErrorMessage("This field cannot be left blank");
      return;
    }
    addUniformCategory(categoryName);
    setCategoryName("");
    setErrorMessage("");
    setShow(true);
  };

  const handleUniformDetailsSubmit = (event) => {
    event.preventDefault();
    addUniform(formData);
    setShow(true);
    setFormData({
      category: "Select One",
      name: "",
      size: "",
      quantity: 1,
    });
  };
  return (
    <>
      <div className="space-y-10 divide-y divide-gray-900/10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Uniform Category
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a new uniform category.
            </p>
          </div>
          <form
            onSubmit={handleUniformCategorySubmit}
            className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
          >
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="categoryName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Uniform Category
                  </label>
                  <p className="mt-1 text-sm text-gray-500">
                    Only use this to create a new uniform category. (ex. Tux
                    Jacket)
                  </p>
                </div>
                <div className="sm:col-span-3">
                  {errorMessage && (
                    <div className="text-red-500 text-sm">{errorMessage}</div>
                  )}
                  <input
                    type="text"
                    name="categoryName"
                    id="categoryName"
                    value={categoryName}
                    onChange={(event) => setCategoryName(event.target.value)}
                    placeholder="Dress, Pants, Jacket, etc."
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="submit"
                    className="mt-4 rounded-md px-3 py-2 w-full sm:w-auto text-white text-sm bg-amber-600 hover:bg-amber-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Uniform Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Enter uniform details, such as size and quantity, here.
            </p>
          </div>
          <form
            onSubmit={handleUniformDetailsSubmit}
            className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
          >
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    defaultValue={"Select One"}
                    value={formData.category}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        category: event.target.value,
                      });
                    }}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-amber-600 sm:text-sm sm:leading-6"
                  >
                    <option disabled>Select One</option>
                    {categories.map((category) => {
                      return (
                        <option key={category.id} value={category.categoryName}>
                          {category.categoryName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          name: event.target.value,
                        });
                      }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="size"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Size
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="size"
                      id="size"
                      value={formData.size}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          size: event.target.value,
                        });
                      }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Quantity
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="quantity"
                      id="quantity"
                      value={formData.quantity}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          quantity: parseInt(event.target.value),
                        });
                      }}
                      defaultValue={1}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-8 rounded-md px-3 py-2 w-full sm:w-auto text-white text-sm bg-amber-600 hover:bg-amber-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-emerald-400 shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0"></div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-white">
                      Successfully saved!
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
