import React, { useState } from "react";
import { CategoryDate } from "../CategoryDummyDate";
import CategoryStyle from "../styles/category/category.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { categoryId } from "../features/postSlice";

const Category = () => {
  const [categoryIcon, setCategoryIcon] = useState();
  const reportDate = useSelector((state: any) => state.posts.date);
  const reportPrice = useSelector((state: any) => state.posts.expence);
  const reportMemo = useSelector((state: any) => state.posts.memo);
  const reportCategory = useSelector((state: any) => state.posts.categoryId);
  console.log(reportDate, reportPrice, reportMemo, reportCategory, 90);

  const dispatch = useDispatch();

  const changeValue = (e: any) => {
    setCategoryIcon(e.target.value);
    dispatch(categoryId(categoryIcon));
  };

  // console.log(categoryIcon);

  console.log(reportCategory);

  return (
    <div className={CategoryStyle.categoryContainer}>
      <p>カテゴリー</p>
      {CategoryDate.map((category) => {
        return (
          <React.Fragment key={category.id}>
            <label>
              <input
                type="radio"
                className="categoryButton"
                name="category"
                id="category"
                value={category.categoryId}
                // checked={categoryIcon === category.categoryId}
                // onChange={changeValue}
                onChange={(e: any) => dispatch(categoryId(e.target.value))}
              />
              <span>{category.url}</span>
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Category;
