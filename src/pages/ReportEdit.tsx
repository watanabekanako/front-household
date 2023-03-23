import React, { useState } from "react";
import Category from "../components/Category";
import HomeStyle from "../styles/pages/Home.module.scss";
import ReportForm from "../components/form/reportForm";
import PrimaryButton from "../components/button/PrimaryButton";
import SecondaryButton from "../components/button/SecondaryButton";
import DefaultLayout from "../components/layout/dafaultLayout";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../components/modal/ConfirmModal";
import Test from "../components/Test";

const ReportEdit = () => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const reportDate = useSelector((state: any) => state.posts.date);
  const reportPrice = useSelector((state: any) => state.posts.expence);
  const reportMemo = useSelector((state: any) => state.posts.memo);
  const reportCategory = useSelector((state: any) => state.posts.category);

  const reportDateTime = new Date(reportDate);
  const updateDate = new Date();
  const navigate = useNavigate();
  const params = useParams();

  //一覧画面の詳細Postデータ
  const { state } = useLocation();

  const clickEdit = async () => {
    //createdAt,categoryId,price必須のバリデーション予定

    const updatePost = {
      content: reportMemo,
      authorId: state.authorId,
      categoryId: reportCategory,
      createdAt: reportDateTime,
      updatedAt: updateDate,
      price: reportPrice,
    };
    await axios.patch(`/post/${params.id}`, updatePost);
    alert("レポートを更新しました");
    //一覧画面完成後、遷移先変更
    navigate("/");
  };

  const deletePost = async () => {
    await axios.delete(`/post/${params.id}`);
    alert("削除しました");
    //一覧画面完成後、遷移先変更
    navigate("/home");
  };

  const deleteOpenModal = () => {
    setEditModalIsOpen(true);
  };

  return (
    <DefaultLayout>
      <div>
        <div className={HomeStyle.reportMain}>
          <ReportForm state={state} />
          <Category state={state} />
          <PrimaryButton children="支出を上書きする" onClick={clickEdit} />
          <SecondaryButton children="削除" onClick={deleteOpenModal} />
          {editModalIsOpen ? (
            <ConfirmModal
              editModalIsOpen={editModalIsOpen}
              setEditModalIsOpen={setEditModalIsOpen}
              onClick={deletePost}
            />
          ) : (
            ""
          )}
          {/* <Test /> */}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ReportEdit;
