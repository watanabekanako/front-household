import React from "react";
import { CategoryDate } from "../CategoryDummyDate";
import CategoryStyle from "../styles/category/category.module.scss";
import { useDispatch } from "react-redux";
import { categoryId } from "../features/postSlice";

const Category = () => {
  const dispatch = useDispatch();

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
