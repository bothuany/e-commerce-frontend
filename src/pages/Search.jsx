import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Products from "../components/Products";
import axios from "axios";
import dir from "../config/dir.json";
import { useClassifier } from "../contexts/ClassifierContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Search() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { sizes, colors, categories } = useClassifier();
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [products, setProducts] = useState([]);
  const [isCategoryNameEntered, setIsCategoryNameEntered] = useState(false);
  const [query, setQuery] = useState(
    "searchText=&colors=&sizes=&categories=&sortBy="
  );

  const { categoryName } = useParams();

  

  const [optionColors, setOptionColors] = useState([
    ...colors.map((color) => ({
      value: color.name,
      label: color.name,
      checked: false,
    })),
  ]);
  const [optionSizes, setOptionSizes] = useState([
    ...sizes.map((size) => ({
      value: size.name,
      label: size.name,
      checked: false,
    })),
  ]);
  const [optionCategories, setOptionCategories] = useState([
    ...categories.map((category) => ({
      value: category.name,
      label: category.name,
      checked: false,
    })),
  ]);


  const sortOptions = [
    {
      name: "Price: Low to High",
      value: "LowToHigh",
      href: "#",
      current: false,
    },
    {
      name: "Price: High to Low",
      value: "HighToLow",
      href: "#",
      current: false,
    },
  ];

  useEffect(() => {
    if(categoryName){
      setIsCategoryNameEntered(true);
    }else{
      setIsCategoryNameEntered(false);
    }
  },[categoryName])
  


  const handleOptionColorsChange = (e) => {
    let index = e.target.id.split("-").pop();
    const updatedOptionColors = [...optionColors];

    updatedOptionColors[index].checked = !updatedOptionColors[index].checked;
    setOptionColors(updatedOptionColors);
  };

  const handleOptionSizesChange = (e) => {
    let index = e.target.id.split("-").pop();
    const updatedOptionSizes = [...optionSizes];

    updatedOptionSizes[index].checked = !updatedOptionSizes[index].checked;
    setOptionSizes(updatedOptionSizes);
  };

  const handleOptionCategoriesChange = (e) => {
    let index = e.target.id.split("-").pop();
    const updatedOptionCategories = [...optionCategories];

    updatedOptionCategories[index].checked =
      !updatedOptionCategories[index].checked;
    setOptionCategories(updatedOptionCategories);
  };

  const handleChange = (e) => {
    if (e.target.name === "color[]") {
      handleOptionColorsChange(e);
    } else if (e.target.name === "size[]") {
      handleOptionSizesChange(e);
    } else if (e.target.name === "category[]") {
      handleOptionCategoriesChange(e);
    }
  };
  const getQuery = (e) => {
    let selectedColors = [];
    let selectedSizes = [];
    let selectedCategories = [];

    if(isCategoryNameEntered){
       
       let isTrue =optionCategories.some((category) => {
          return category.value == categoryName && category.checked;
      })
      if(!isTrue){
        optionCategories.forEach((category, index) => {
          if (category.value == categoryName) {
            const updatedOptionCategories = [...optionCategories]
             updatedOptionCategories[index]= {...category,checked:true}

            setOptionCategories(updatedOptionCategories);
          }
        });
      }
    }

    optionColors.forEach((color) => {
      if (color.checked) {
        selectedColors.push(color.value);
      }
    });

    optionSizes.forEach((size) => {
      if (size.checked) {
        selectedSizes.push(size.value);
      }
    });
    

    optionCategories.forEach((category) => {
      if (category.checked) {
        selectedCategories.push(category.value);
      }
    });

    
    setQuery(
      "searchText=" +
        searchText +
        "&colors=" +
        selectedColors.join(",") +
        "&sizes=" +
        selectedSizes.join(",") +
        "&categories=" +
        selectedCategories.join(",") +
        "&sortBy=" +
        sortBy
    );
  };

  useEffect(() => {
    getQuery();
  }, [optionColors, optionSizes, optionCategories, sortBy, searchText, isCategoryNameEntered]);

  useEffect(() => {
    const handleSearch = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios
        .get(dir.api + "/api/products/search/?" + query, config)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    handleSearch();
  }, [query]);

  useEffect(() => {
    setOptionColors([
      ...colors.map((color) => ({
        value: color.name,
        label: color.name,
        checked: false,
      })),
    ]);
  }, [colors]);

  useEffect(() => {
    setOptionSizes([
      ...sizes.map((size) => ({
        value: size.name,
        label: size.name,
        checked: false,
      })),
    ]);
  }, [sizes]);

  useEffect(() => {
    setOptionCategories([
      ...categories.map((category) => ({
        value: category.name,
        label: category.name,
        checked: false,
      })),
    ]);
  }, [categories]);

  const filters = [
    {
      id: "color",
      name: "Color",
      options: optionColors,
    },
    {
      id: "category",
      name: "Category",
      options: optionCategories,
    },
    {
      id: "size",
      name: "Size",
      options: optionSizes,
    },
  ];

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      onChange={handleChange}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {isCategoryNameEntered ? categoryName : "New Arrivals"}
            </h1>
            {/*Search Bar*/}
            <form className="max-w-sm px-4">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full py-3 pl-12 pr-24 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-violet-600"
                />
              </div>
            </form>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              onClick={() => setSortBy(option.value)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4 h-40 overflow-y-auto">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  onChange={handleChange}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {
                  /* Your content */
                  <Products products={products} />
                }
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Search;
