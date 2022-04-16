import React from "react";
import logo from "../../images/logo.JPG";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createPostAction } from "../../redux/slices/posts/postSlices";
import CategoryDropDown from "../Categories/CategoryDropDown";
import Dropzone, {useDropzone } from "react-dropzone"
import styled from "styled-components";

// css for dropzone 
const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding:10px;
    border-width:2px;
    border-radius:2px;
    border-style:dashed;
    background-color:#bdbdbd;
    color:black;
    transition:border 0.24s ease-in-out;

`;
const formSchema = Yup.object({
  title: Yup.string().required("title is required"),
  description: Yup.string().required("description is required"),
  category: Yup.object().required("category is required"),
  image: Yup.string().required("image is required"),
});

const CreatePost = () => {
  const dispatch = useDispatch();

  const state = useSelector(state =>state?.post);

  const {isCreated , loading , appErr , serverErr} = state;
  
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      image: "",
    },
    onSubmit: (values) => {
        const data ={
            category: values?.category?.label,
            title: values?.title,
            description: values?.description,
            image: values?.image,
        }
        dispatch(createPostAction(data));
      console.log(data);
    },
    validationSchema: formSchema,
  });
//   const storeData = useSelector((store) => store?.post);
//   console.log(storeData);

//   const { loading, appErr, serverErr, post, isCreated } = storeData;

  // redirect the user to login if registration is successful if(registered){
  // return <Redirect to="profile" /> }

  //   console.log(appErr + category);

  if (isCreated) return <Redirect to="/createpost"> </Redirect>;
  return (
    <>
      {" "}
      <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-4">
        {" "}
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Add New post
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

          {/* select drop down */}
            <CategoryDropDown
              value={formik.values.category?.label}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.category}
              touched={formik.touched.category}
            ></CategoryDropDown>

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

            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  description
                </label>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  autoComplete="description"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Add new description"
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                />
              </div>
            </div>
            <div className="text-red-400 mb-2">
              {formik.touched.description && formik.errors.description}
            </div>

            {/* image component */}
         
            <Container className="container text-color-black">
                  <Dropzone
                    onBlur={formik.handleBlur("image")}
                    accept="image/jpeg, image/png"
                    onDrop={acceptedFiles => {
                      formik.setFieldValue("image", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="container">
                        <div
                          {...getRootProps({
                            className: "dropzone",
                            onDrop: event => event.stopPropagation(),
                          })}
                        >
                          <input {...getInputProps()} />
                          <p className="text-black-700 text-lg cursor-pointer hover:text-gray-700">
                            Click here to select image for Poster/Banner 
                          </p>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </Container>
                {/* Err msg */}
            {/* <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  New Category
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  autoComplete="category"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Add new category"
                  value={formik.values.category}
                  onChange={formik.handleChange("category")}
                  onBlur={formik.handleBlur("category")}
                />
              </div>
            </div>
            <div className="text-red-400 mb-2">
              {formik.touched.category && formik.errors.category}
            </div> */}
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
                  Add new Post
                </button>
              )}
            </div>
          </form>
        </div>{" "}
      </div>{" "}
    </>
  );
};

export default CreatePost;
