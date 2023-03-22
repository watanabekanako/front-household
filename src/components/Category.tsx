import React, { useState } from "react";
import { categoryNameList, categoryDate } from "../CategoryDummyDate";
import CategoryStyle from "../styles/category/category.module.scss";
import { useDispatch } from "react-redux";
import { categoryId } from "../features/postSlice";
import { useLocation } from "react-router-dom";
import { PostState } from "../types/Types";

const Category = (state: any) => {
  const location = useLocation();
  const currentLocation = location.pathname;
  const categoryState = state.state;

  const [categorys, setCategory] = useState(
    currentLocation.slice(1, 5) === "edit" ? categoryState?.category.name : ""
  );
  const dispatch = useDispatch();

  const initialCategoryDate = categoryDate.filter(
    (item) => categorys === item.name
  );

  //一瞬だけreduxに入るが初期値に戻る動きの解消
  if (categorys === categoryState?.category.name) {
    dispatch(categoryId(initialCategoryDate[0].categoryId));
  }
  console.log(categoryState);
  const changeCategory = (e: any) => {
    setCategory(e.target.value);
    const newCategoryDate = categoryDate.filter(
      (item) => e.target.value === item.name
    );
    dispatch(categoryId(Number(newCategoryDate[0].categoryId)));
  };

  return (
    <div className={CategoryStyle.categoryContainer}>
      <p>カテゴリー</p>
      {categoryNameList?.map((category) => {
        return (
          <React.Fragment key={category}>
            {/* <div className={CategoryStyle.radio}> */}
            <label>
              <input
                type="radio"
                className="categoryButton"
                name="category"
                id="category"
                value={category}
                checked={category === categorys}
                onChange={changeCategory}
              />
              <span>{category}</span>
            </label>
            {/* </div> */}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Category;
