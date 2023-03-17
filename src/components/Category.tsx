import React, { useState, useEffect } from "react";
import { CategoryDate } from "../CategoryDummyDate";
import CategoryStyle from "../styles/category/category.module.scss";
import { useDispatch } from "react-redux";
import { categoryId } from "../features/postSlice";
import { useLocation } from "react-router-dom";
import { PostState } from "../types/Types";

const Category = (state: any) => {
  const location = useLocation();
  const currentLocation = location.pathname;
  const categoryState = state.state;

  const [category, setCategory] = useState(
    currentLocation.slice(1, 5) === "edit" ? categoryState?.categoryId : ""
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryState?.categoryId !== category) {
      setCategory(categoryState?.categoryId);
    }
  }, [categoryState]);

  const changeCategory = (e: any) => {
    setCategory(e.target.value);
    dispatch(categoryId(Number(e.target.value)));
  };

  return (
    <div className={CategoryStyle.categoryContainer}>
      <p>カテゴリー</p>
      {CategoryDate.map((categoryData) => {
        return (
          <React.Fragment key={categoryData.id}>
            <label>
              <input
                type="radio"
                className="categoryButton"
                name="category"
                id="category"
                value={categoryData.categoryId}
                checked={category === categoryData.categoryId}
                onChange={changeCategory}
              />
              <span>{categoryData.url}</span>
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Category;

// import React, { useState } from "react";
// import { CategoryDate } from "../CategoryDummyDate";
// import CategoryStyle from "../styles/category/category.module.scss";
// import { useDispatch } from "react-redux";
// import { categoryId } from "../features/postSlice";
// import { useLocation } from "react-router-dom";
// import { PostState } from "../types/Types";

// const Category = (state: any) => {
//   const location = useLocation();
//   const currentLocation = location.pathname;
//   const categoryState = state.state;

//   const [category, setCategory] = useState(
//     currentLocation.slice(1, 5) === "edit" ? categoryState?.categoryId : ""
//   );
//   const dispatch = useDispatch();

//   //一瞬だけreduxに入るが初期値に戻る動きの解消
//   if (category === categoryState?.categoryId) {
//     dispatch(categoryId(categoryState?.categoryId));
//   }
//   console.log(categoryState);
//   const changeCategory = (e: any) => {
//     setCategory(e.target.value);
//     dispatch(categoryId(Number(e.target.value)));
//   };
//   console.log(category);

//   return (
//     <div className={CategoryStyle.categoryContainer}>
//       <p>カテゴリー</p>
//       {CategoryDate.map((category) => {
//         return (
//           <React.Fragment key={category.id}>
//             <label>
//               <input
//                 type="radio"
//                 className="categoryButton"
//                 name="category"
//                 id="category"
//                 value={category.categoryId}
//                 checked={categoryState?.categoryId === category.categoryId}
//                 onChange={changeCategory}
//               />
//               <span>{category.url}</span>
//             </label>
//           </React.Fragment>
//         );
//       })}
//     </div>
//   );
// };

// export default Category;
