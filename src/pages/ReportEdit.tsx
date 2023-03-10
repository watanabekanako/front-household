import React from "react";
import Category from "../components/Category";
import Navigation from "../components/Navigation";
import HomeStyle from "../styles/pages/Home.module.scss";
import ReportForm from "../components/form/reportForm";
import PrimaryButton from "../components/button/PrimaryButton";
import SecondaryButton from "../components/button/SecondaryButton";
import DefaultLayout from "../components/layout/dafaultLayout";

const Home = () => {
  const clickEdit = () => {
    alert("登録しました");
  };

  const deletePost = () => {
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
