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

  console.log(categoryState?.categoryId);

  const [isExpence, setIsExpence] = useState(true);

  //支出と収入を分ける
  const categories = isExpence
    ? expenceCategoryDate.expence
    : expenceCategoryDate.income;

  //パス、支出と収入切り替えによって初期値切り替え
  const [postedCategory, setPostedCategory] = useState<string>(() => {
    if (!currentLocation.startsWith("/home")) {
      return categoryState?.category.name ?? "";
    } else {
      return isExpence ? "給料" : "食費";
    }
  });

  console.log(postedCategory);
  useEffect(() => {
    setPostedCategory(!isExpence ? "給料" : "食費");
  }, [isExpence]);

  //
  const [initialCategoryData, setInitialCategoryData] = useState<
    CategoryData | undefined
  >(undefined);

  console.log(initialCategoryData);

  //初期値と選択した値が一致したらreduxへ（支出・収入で切り替え）
  useEffect(() => {
    const newData = categories.find((item) => item.name === postedCategory);
    console.log(newData, "new");
    if (newData) {
      setInitialCategoryData(newData);
      dispatch(categoryId(Number(newData.categoryId)));
    } else {
      //未選択でも初期値として
      dispatch(categoryId(!isExpence ? 13 : 1));
    }
  }, [postedCategory, isExpence]);

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
      setPostedCategory("");
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
