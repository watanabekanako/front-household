import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Category from "../components/Category";
import HomeStyle from "../styles/pages/Home.module.scss";
import ReportForm from "../components/form/reportForm";
import PrimaryButton from "../components/button/PrimaryButton";
import DefaultLayout from "../components/layout/dafaultLayout";
import axios from "axios";
import { useRef } from "react";

const Home = () => {
  const [formClear, setFormClear] = useState(true);
  const [user, setUser] = useState([]);

  const reportDate = useSelector((state: any) => state.posts.date);
  const reportPrice = useSelector((state: any) => state.posts.expence);
  const reportMemo = useSelector((state: any) => state.posts.memo);
  const reportCategory = useSelector((state: any) => state.posts.category);

  const reportDateTime = new Date(reportDate);
  const updateDate = new Date();

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get("/user");
      setUser(response.data);
    };
    getUser();
  }, []);

  console.log(user);

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
    setFormClear(false);
    alert("レポートを登録しました");
  };

  return (
    <DefaultLayout>
      <div>
        <div className={HomeStyle.reportMain}>
          <ReportForm />
          <Category />
          <PrimaryButton children="支出を入力する" onClick={clickPost} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
