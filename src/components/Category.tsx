import React, {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { categoryNameList, categoryDate } from "../CategoryDummyDate";
import CategoryStyle from "../styles/category/category.module.scss";
import { useDispatch } from "react-redux";
import { categoryId } from "../features/postSlice";
import { useLocation } from "react-router-dom";
import { PostState } from "../types/Types";

const Category = forwardRef((state: any, ref) => {
  const location = useLocation();
  const currentLocation = location.pathname;
  const categoryState = state.state;
  const dispatch = useDispatch();

  //編集画面の場合のみ初期値をいれる
  const [postedCategory, setpostedCategory] = useState(
    currentLocation.slice(1, 5) === "edit" ? categoryState?.category.name : ""
  );

  //カテゴリー名一致
  const initialCategoryDate = categoryDate.filter(
    (item) => postedCategory === item.name
  );

  //一瞬だけreduxに入るが初期値に戻る動きの解消
  useEffect(() => {
    if (postedCategory === categoryState?.category.name) {
      dispatch(categoryId(initialCategoryDate[0].categoryId));
    } else {
      dispatch(categoryId(Number(postedCategory)));
    }
  }, []);

  const changeCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setpostedCategory(e.target.value);
    const newCategoryDate = categoryDate.filter(
      (item) => e.target.value === item.name
    );
    dispatch(categoryId(Number(newCategoryDate[0].categoryId)));
  };

  useImperativeHandle(ref, () => ({
    clearCategory: () => {
      setpostedCategory("");
    },
  }));

  return (
    <div className={CategoryStyle.categoryContainer}>
      <p>カテゴリー</p>
      {categoryNameList?.map((category: string) => {
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
                checked={category === postedCategory}
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
});

export default Category;
