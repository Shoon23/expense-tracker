import React, { useEffect, useState } from "react";
import categoryQuery from "../../services/api/categoryQuery";
import Loading from "../common/Loading";

interface Props {
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  category: {
    id: number;
    name: string;
    description: string | null;
    createdAt: string;
    expenses: number;
  };
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateForm: React.FC<Props> = ({
  setIsShowForm,
  category,
  setShowModal,
}) => {
  const initialCategoryData = { categoryId: 0, name: "", description: "" };
  const { mutateAsync, isError, isLoading } =
    categoryQuery.updateCategory(setShowModal);
  useEffect(() => {
    setCategoryData({
      categoryId: category?.id,
      name: category?.name,
      description: category?.description || null,
    });

    return () => {
      setCategoryData(initialCategoryData);
    };
  }, []);

  const [categoryData, setCategoryData] = useState<{
    categoryId: number;
    name?: string;
    description?: string | null;
  }>(initialCategoryData);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCategoryData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateData = categoryData;

    if (updateData?.description === category?.description) {
      delete updateData?.description;
    }
    if (updateData?.name === category?.name) {
      delete updateData?.name;
    }

    mutateAsync(updateData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {isError && (
        <p className="mb-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Oops!</span> Something went wrong
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Category Name
          </label>
          <input
            onChange={handleOnChange}
            value={categoryData?.name}
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type product name"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            onChange={handleOnChange}
            id="description"
            name="description"
            value={categoryData?.description || ""}
            rows={8}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Write a product description here..."
          ></textarea>
        </div>
      </div>
      <div className="flex mt-4">
        <button
          disabled={
            category?.description === categoryData?.description &&
            category?.name === categoryData?.name
          }
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {isLoading ? <Loading /> : "Submit Update"}
        </button>
        <button
          onClick={() => setIsShowForm(false)}
          type="button"
          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
