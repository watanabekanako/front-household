import React from "react";
import Category from "../components/Category";
import Navigation from "../components/Navigation";
import HomeStyle from "../styles/pages/Home.module.scss";
import ReportForm from "../components/form/reportForm";
import PrimaryButton from "../components/button/PrimaryButton";

const Home = () => {
  const clickPost = () => {
    alert("登録しました");
  };

  return (
    <div>
      <Navigation />
      <div className={HomeStyle.reportMain}>
        <ReportForm />
        <Category />
        <PrimaryButton children="支出を入力する" onClick={clickPost} />
      </div>
    </div>
  );
};

export default Home;
