import React from "react";
import Category from "../components/Category";
import Navigation from "../components/Navigation";
import HomeStyle from "../styles/pages/Home.module.scss";
import ReportForm from "../components/form/reportForm";
import PrimaryButton from "../components/button/PrimaryButton";
import SecondaryButton from "../components/button/SecondaryButton";
import DefaultLayout from "../components/layout/dafaultLayout";
import { useSelector } from "react-redux";
import axios from "axios";

const Home = () => {
  const reportDate = useSelector((state: any) => state.posts.date);
  const reportPrice = useSelector((state: any) => state.posts.expence);
  const reportMemo = useSelector((state: any) => state.posts.memo);
  const reportCategory = useSelector((state: any) => state.posts.category);

  const reportDateTime = new Date(reportDate);
  const updateDate = new Date();

  const clickEdit = async () => {
    const updatePost = {
      content: reportMemo,
      authorId: 1,
      categoryId: reportCategory,
      createdAt: reportDateTime,
      updatedAt: updateDate,
      price: reportPrice,
    };
    await axios.patch("/post/13", updatePost);
    alert("レポートを更新しました");

  };

  const deletePost = async () => {
    await axios.delete("/post/12");
    alert("削除しました");
  };

  return (
    <DefaultLayout>
      <div>
        <div className={HomeStyle.reportMain}>
          <ReportForm />
          <Category />
          <PrimaryButton children="支出を上書きする" onClick={clickEdit} />
          <SecondaryButton children="削除" onClick={deletePost} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
