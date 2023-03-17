import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Category from "../components/Category";
import HomeStyle from "../styles/pages/Home.module.scss";
import ReportForm from "../components/form/reportForm";
import PrimaryButton from "../components/button/PrimaryButton";
import DefaultLayout from "../components/layout/dafaultLayout";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const reportDate = useSelector((state: any) => state.posts.date);
  const reportPrice = useSelector((state: any) => state.posts.expence);
  const reportMemo = useSelector((state: any) => state.posts.memo);
  const reportCategory = useSelector((state: any) => state.posts.category);

  const reportDateTime = new Date(reportDate);
  const updateDate = new Date();

  const navigate = useNavigate();

  const clickPost = async () => {
    const newPost = {
      content: reportMemo,
      authorId: 1,
      categoryId: reportCategory,
      createdAt: reportDateTime,
      updatedAt: updateDate,
      price: reportPrice,
    };
    await axios.post("/post", newPost);
    alert("レポートを登録しました");
  };

  // const clickNavi = () => {};

  return (
    <DefaultLayout>
      <div>
        <div className={HomeStyle.reportMain}>
          <ReportForm />
          <Category />
          <PrimaryButton children="支出を入力する" onClick={clickPost} />
          {/* <button onClick={clickNavi}>移動</button> */}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
