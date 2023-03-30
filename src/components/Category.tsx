import React, {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { expenceCategoryDate } from "../CategoryDate";
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

  const [isExpence, setIsExpence] = useState(true);
  const categories = isExpence
    ? expenceCategoryDate.expence
    : expenceCategoryDate.income;

  //カテゴリー名一致
  const initialCategoryDate = categories.filter(
    (item) => postedCategory === item.name
  );

  //一瞬だけreduxに入るが初期値に戻る動きの解消（reduxにcategoryIdをいれる）
  //trueのとき収入の給料IDが入るように修正する
  useEffect(() => {
    if (postedCategory === categoryState?.category.name) {
      dispatch(categoryId(initialCategoryDate[0]?.categoryId));
    } else {
      dispatch(categoryId(1));
    }
  }, []);

  const changeCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setpostedCategory(e.target.value);
    const newCategoryDate = categories.filter(
      (item) => e.target.value === item.name
    );
    dispatch(categoryId(Number(newCategoryDate[0].categoryId)));
  };

  const changeClick = () => {
    setIsExpence(!isExpence);
  };

  useImperativeHandle(ref, () => ({
    clearCategory: () => {
      setpostedCategory("");
    },
  }));

  return (
    <div className={CategoryStyle.categoryContainer}>
      <p>カテゴリー</p>
      <div className={CategoryStyle.categoryChanege}>
        <button
          onClick={changeClick}
          className={isExpence ? CategoryStyle.changeButton : ""}
        >
          支出
        </button>
        <button
          onClick={changeClick}
          className={!isExpence ? CategoryStyle.changeButton : ""}
        >
          収入
        </button>
      </div>
      <div>
        {categories?.map((category: CategoryData) => {
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
    </div>
  );
});

export default Category;
