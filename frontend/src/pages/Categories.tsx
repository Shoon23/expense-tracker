import { CategoriesTable, AddModal } from "../components/Categories";

const Categories = () => {
  return (
    <div className="p-4 sm:ml-64 flex flex-col gap-3">
      <CategoriesTable />
      <AddModal />
    </div>
  );
};

export default Categories;
