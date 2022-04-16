import React from "react";
import logo from "../../images/logo.JPG";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryACtion } from "../../redux/slices/category/categorySlice";
import { Redirect } from "react-router-dom";
const formSchema = Yup.object({
  title: Yup.string().required("title is required"),
});

function AddNewCategory() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      dispatch(createCategoryACtion(values));
      console.log(values);
    },
    validationSchema: formSchema,
  });

  // console.log(form;ik)
  const storeData = useSelector((store) => store?.category);
  console.log(storeData);

  const { loading, appErr, serverErr, category , isCreated } = storeData;

  // redirect the user to login if registration is successful if(registered){
  // return <Redirect to="profile" /> }

//   console.log(appErr + category);

  if(isCreated) return (<Redirect to="/categoryall"> </Redirect>);

  return (
    <>
      {" "}
      <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {" "}
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Add New Category
            </h2>
            {/* display error message */}
            {appErr || serverErr ? (
              <h5 className="mt-6 text-center  font-extrabold text-red-400">
                {serverErr}:{appErr}
              </h5>
            ) : null}

            <p className="mt-2 text-center text-sm text-gray-600"></p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  New Category
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="title"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Add new title"
                  value={formik.values.title}
                  onChange={formik.handleChange("title")}
                  onBlur={formik.handleBlur("title")}
                />
              </div>
            </div>
            <div className="text-red-400 mb-2">
              {formik.touched.title && formik.errors.title}
            </div>
            <div>
              {/* check for loading */}
              {loading ? (
                <button
                  disabled="disabled"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Loading please wait...
                </button>
              ) : (
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add new Category
                </button>
              )}
            </div>
          </form>
        </div>{" "}
      </div>{" "}
    </>
  );
}

export default AddNewCategory;
