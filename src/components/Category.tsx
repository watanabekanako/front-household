import React, { useState } from "react";
import { CategoryDate } from "../CategoryDummyDate";
import CategoryStyle from "../styles/category/category.module.scss";

const Category = () => {
  // const [categoryIcon, setCategoryIcon] = useState("a");

  return (
    <div className={CategoryStyle.categoryContainer}>
      <p>カテゴリー</p>
      {CategoryDate.map((category) => {
        return (
          <>
            <label key={category.url}>
              <input
                type="radio"
                className="categoryButton"
                name="category"
                id="category"
                value={category.url}
                // checked={categoryIcon === category.url}
                // onChange={(e) => setCategoryIcon(e.target.value)}
              />
              <span>{category.url}</span>
            </label>
          </>
        );
      })}
    </div>
  );
};

export default Category;
