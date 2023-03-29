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

const Home: React.FC = () => {
  const reportDate = useSelector((state: RootState) => state.posts.date);
  const reportPrice = useSelector((state: RootState) => state.posts.expence);
  const reportMemo = useSelector((state: RootState) => state.posts.memo);
  const reportCategory = useSelector(
    (state: RootState) => state.posts.category
  );

  const userId = Cookies.get("id");

  const reportDateTime = new Date(reportDate);
  const updateDate = new Date();

  const inputFormRef = useRef<HTMLFormElement>(null);
  const categoryRef = useRef<HTMLFormElement>(null);

  const { successMsg, errorMsg } = toastItem();

  const clickPost = async () => {
    const newPost = {
      content: reportMemo,
      authorId: userId,
      categoryId: reportCategory,
      createdAt: reportDateTime,
      updatedAt: updateDate,
      price: reportPrice,
    };
    if (reportPrice === 0) {
      errorMsg("金額を0円以上入力してください");
    }
    await axios.post("/post", newPost);
    successMsg("レポートを登録しました");
    if (inputFormRef.current !== null || categoryRef.current !== null) {
      inputFormRef.current?.clearForm();
      categoryRef.current?.clearCategory();
    }
  };

  return (
    <DefaultLayout>
      <div>
        <div className={HomeStyle.reportMain}>
          <ReportForm ref={inputFormRef} />
          <Category ref={categoryRef} />
          <PrimaryButton children="支出を入力する" onClick={clickPost} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
