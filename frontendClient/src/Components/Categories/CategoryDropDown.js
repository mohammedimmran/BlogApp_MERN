import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchAllCategoryACtion } from "../../redux/slices/category/categorySlice";

const options = [{}];

const CategoryDropDown = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCategoryACtion());
  }, [dispatch]);

  const category = useSelector((state) => state.category);
  const { categoryList, loading, appErr, serverErr } = category;

  const all = categoryList?.map((category) => {
    return { label: category?.title, value: category?._id };
  });
  const handleChange = (value) => {
    props.onChange("category", value);
  };
  const handleBlur = () => {
    props.onBlur("category", true);
  };
  return (
    <div>
      {loading ? (
        <h3>loading...</h3>
      ) : (
        <Select
          id="category"
          onChange={handleChange}
          onBlur={handleBlur}
          value={props?.value?.label}
          options={all}
        />
      )}
      {/* display error */}
      {props?.error && <div className="text-red-400 mb-2">{props?.error}</div>}
    </div>
  );
};

export default CategoryDropDown;
