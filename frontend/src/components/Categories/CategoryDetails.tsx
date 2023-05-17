import React from "react";

const CategoryDetails = () => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Budget:
        <span className="ml-2 text-gray-500">3000</span>
      </h3>
      <h3 className="text-lg font-semibold text-gray-900 ">
        Date:
        <span className="ml-2 text-gray-500">12-02-1292</span>
      </h3>
      <h3 className="text-gray-900 text-lg font-semibold ">Description:</h3>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        With less than a month to go before the European Union enacts new
        consumer privacy laws for its citizens, companies around the world are
        updating their terms of service agreements to comply.
      </p>
    </div>
  );
};

export default CategoryDetails;
