import React, {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { categoryDate } from "../CategoryDate";
import CategoryStyle from "../styles/category/category.module.scss";
import { useDispatch } from "react-redux";
import { categoryId } from "../features/postSlice";
import { useLocation } from "react-router-dom";
import { CategoryData, PostState } from "../types/Types";

const Category = forwardRef((props, ref) => {
  const { state } = useLocation();
  const location = useLocation();
  const currentLocation = location.pathname;
  const categoryState: PostState = state;
  const dispatch = useDispatch();

  //編集画面の場合のみ初期値をいれる
  const [postedCategory, setpostedCategory] = useState<string>(
    !currentLocation.startsWith("/home") ? categoryState?.category.name : "食費"
  );

  //カテゴリー名一致
  const initialCategoryDate = categoryDate.filter(
    (item) => postedCategory === item.name
  );

  //一瞬だけreduxに入るが初期値に戻る動きの解消（reduxにcategoryIdをいれる）
  useEffect(() => {
    if (postedCategory === categoryState?.category.name) {
      dispatch(categoryId(initialCategoryDate[0]?.categoryId));
    } else {
      dispatch(categoryId(1));
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
      {categoryDate?.map((category: CategoryData) => {
        return (
          <React.Fragment key={category.id}>
            {/* <div className={CategoryStyle.radio}> */}
            <label>
              <input
                type="radio"
                className="categoryButton"
                name="category"
                id="category"
                value={category.name}
                checked={category.name === postedCategory}
                onChange={changeCategory}
              />
              <span>
                {category.name}
                {category.icon}
              </span>
            </label>
            {/* </div> */}
          </React.Fragment>
        );
      })}
    </div>
  );
});

export default Category;
