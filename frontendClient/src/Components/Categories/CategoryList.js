import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllCategoryACtion } from "../../redux/slices/category/categorySlice";
import DateFormatter from "../../utils/DateFormatter";
import Loading from "../../utils/Loading";


function CategoryList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCategoryACtion());
  }, [dispatch]);

  const category = useSelector((state) => state?.category);

  const { categoryList, loading, appErr, serverErr } = category;
  // console.log(categoryList , loading , appErr, serverErr)

  return (
    <>
      {loading ? (<Loading></Loading>) : appErr || serverErr ? (<h1>{appErr} : {serverErr}</h1>) : categoryList?.length <= 0 ? (
        <h2>No category found</h2>
      ) : (
        <div className="max-w-2xl mx-auto my-10">
          <div className="flex flex-col">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden ">
                  <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Author
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Created At
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Edit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {categoryList?.map((category) => (
                        <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {category?.user?.firstName +
                              " " +
                              category?.user?.lastName}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                            {category?.title}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          
                            {/* {category?.createdAt} */}
                            {<DateFormatter date={category?.createdAt}></DateFormatter>}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                            <Link
                              to={`/updatecategory/${category?._id}`}
                              className="text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryList;
