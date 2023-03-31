import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Category from "../components/Category";
import HomeStyle from "../styles/pages/Home.module.scss";
import ReportForm from "../components/form/reportForm";
import PrimaryButton from "../components/button/PrimaryButton";
import DefaultLayout from "../components/layout/defaultLayout";
import axios from "axios";
import Cookies from "js-cookie";
import toastItem from "../components/modal/Toast";
import { RootState } from "../types/Types";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const reportDate = useSelector((state: RootState) => state.posts.date);
  const reportPrice = useSelector((state: RootState) => state.posts.price);
  const reportMemo = useSelector((state: RootState) => state.posts.memo);
  const reportCategory = useSelector(
    (state: RootState) => state.posts.category
  );

  const userId = Cookies.get("id");

  const reportDateTime = new Date(reportDate);
  const updateDate = new Date();

  const inputFormRef = useRef<HTMLFormElement>(null);
  const categoryRef = useRef<HTMLFormElement>(null);

  const navigate = useNavigate();

  const { successMsg, errorMsg } = toastItem();

  const clickPost = async () => {
    const newPost = {
      content: reportMemo,
      authorId: userId,
      categoryId: reportCategory,
      createdAt: reportDateTime,
      updatedAt: updateDate,
      expence: reportPrice,
      income: reportPrice,
    };

    if (reportCategory < 13) {
      newPost.income = 0;
    }
    if (reportCategory >= 13) {
      newPost.expence = 0;
    }

    if (reportPrice === 0) {
      errorMsg("金額を0円以上入力してください");
    } else {
      await axios.post("/post", newPost);
      successMsg("レポートを登録しました");
      if (inputFormRef.current !== null || categoryRef.current !== null) {
        inputFormRef.current?.clearForm();
        categoryRef.current?.clearCategory();
      }
    }
  };
  const testData = {
    id: 35,
    content: "",
    authorId: 1,
    categoryId: 2,
    createdAt: "2023-03-31T00:00:00.000Z",
    updatedAt: "2023-03-31T01:41:46.380Z",
    expence: 2220,
    income: 0,
    category: { id: 2, name: "日用品" },
  };
  const testData2 = {
    id: 35,
    content: "",
    authorId: 1,
    categoryId: 14,
    createdAt: "2023-03-31T00:00:00.000Z",
    updatedAt: "2023-03-31T01:41:46.380Z",
    expence: 0,
    income: 30000,
    category: { id: 14, name: "おこづかい" },
  };

  const testClick = () => {
    navigate("/edit/35", { state: testData });
  };
  const testClick2 = () => {
    navigate("/edit/35", { state: testData2 });
  };

  return (
    <DefaultLayout>
      <div>
        <div className={HomeStyle.reportMain}>
          <ReportForm ref={inputFormRef} />
          <Category ref={categoryRef} />
          <PrimaryButton children="支出を入力する" onClick={clickPost} />
          <button onClick={testClick}>expence移動</button>
          <button onClick={testClick2}>income移動</button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
