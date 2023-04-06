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

  const [isExpence, setIsExpence] = useState(
    !currentLocation.startsWith("/home") && categoryState?.categoryId > 12
      ? false
      : true
  );

  //支出と収入を分ける
  const categories = isExpence
    ? expenceCategoryDate.expence //true
    : expenceCategoryDate.income; //false

  //パス、支出と収入（isExpence）切り替えによって初期値切り替え
  const [postedCategory, setPostedCategory] = useState<string>(() => {
    if (!currentLocation.startsWith("/home")) {
      return categoryState?.category.name ?? "";
    } else {
      return isExpence ? "食費" : "給料";
    }
  });

  // /editのときは登録データを初期値
  useEffect(() => {
    if (!currentLocation.startsWith("/home")) {
      setPostedCategory(categoryState?.category.name ?? "");
    } else {
      setPostedCategory(isExpence ? "食費" : "給料");
    }
  }, [categoryState, currentLocation, isExpence]);
  console.log(postedCategory, 198);
  console.log(isExpence, 1008);

  //
  const [initialCategoryData, setInitialCategoryData] = useState<
    CategoryData | undefined
  >(undefined);

  console.log(initialCategoryData);

  //初期値と選択した値が一致したらreduxへ（支出・収入で切り替え）
  useEffect(() => {
    const newData = categories.find((item) => item.name === postedCategory);
    if (newData) {
      console.log(newData, 98);
      setInitialCategoryData(newData);
      dispatch(categoryId(Number(newData?.categoryId)));
    } else {
      // 未選択でも初期値として（/home）
      dispatch(categoryId(!isExpence ? 13 : 1));
    }
  }, [postedCategory, isExpence, categories, dispatch]);

  const changeCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setPostedCategory(e.target.value);
    const newCategoryData = categories.find(
      (item) => e.target.value === item.name
    );
    if (newCategoryData) {
      dispatch(categoryId(Number(newCategoryData.categoryId)));
    }
  };

  const changeExpenceClick = () => {
    if (!isExpence) {
      setIsExpence(true);
    }
  };
  const changeIncomeClick = () => {
    if (isExpence) {
      setIsExpence(false);
    }
  };

  useImperativeHandle(ref, () => ({
    clearCategory: () => {
      setPostedCategory(isExpence ? "食費" : "給料");
    },
  }));

  return (
    <div className={CategoryStyle.categoryContainer}>
      <p>カテゴリー</p>
      {currentLocation.startsWith("/home") ? (
        <div className={CategoryStyle.categoryChange}>
          <button
            onClick={changeExpenceClick}
            className={isExpence ? CategoryStyle.changeButton : ""}
          >
            支出
          </button>
          <button
            onClick={changeIncomeClick}
            className={!isExpence ? CategoryStyle.changeButton : ""}
          >
            収入
          </button>
        </div>
      ) : (
        ""
      )}
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
