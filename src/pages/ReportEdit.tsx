import React, { useState } from "react";
import Category from "../components/Category";
import HomeStyle from "../styles/pages/Home.module.scss";
import ReportForm from "../components/form/reportForm";
import PrimaryButton from "../components/button/PrimaryButton";
import SecondaryButton from "../components/button/SecondaryButton";
import DefaultLayout from "../components/layout/defaultLayout";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../components/modal/ConfirmModal";
import toastItem from "../components/modal/Toast";
import { RootState } from "../types/Types";
import Cookies from "js-cookie";

const ReportEdit: React.FC = () => {
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);

  const reportDate = useSelector((state: RootState) => state.posts.date);
  const reportPrice = useSelector((state: RootState) => state.posts.price);
  const reportMemo = useSelector((state: RootState) => state.posts.memo);
  const reportCategory = useSelector(
    (state: RootState) => state.posts.category
  );

  const reportDateTime = new Date(reportDate);
  const updateDate = new Date();
  const navigate = useNavigate();
  const params = useParams();

  const userId = Cookies.get("id");

  const { successMsg, errorMsg } = toastItem();

  const clickEdit = async () => {
    const updatePost = {
      content: reportMemo,
      authorId: userId,
      categoryId: reportCategory,
      createdAt: reportDateTime,
      updatedAt: updateDate,
      expence: reportPrice,
      income: reportPrice,
    };

    if (reportCategory < 13) {
      updatePost.income = 0;
    }
    if (reportCategory >= 13) {
      updatePost.expence = 0;
    }

    if (reportPrice === 0) {
      errorMsg("金額を0円以上入力してください");
    } else {
      await axios.patch(`/post/${params.id}`, updatePost);
      successMsg("レポートを更新しました");
      navigate("/report");
    }
  };

  const deletePost = async () => {
    await axios.delete(`/post/${params.id}`);
    successMsg("削除しました");
    navigate("/report");
  };

  const deleteOpenModal = () => {
    setEditModalIsOpen(true);
  };

  return (
    <DefaultLayout>
      <div>
        <div className={HomeStyle.reportMain}>
          <ReportForm />
          <Category />
          <PrimaryButton children="支出を上書きする" onClick={clickEdit} />
          <SecondaryButton children="削除" onClick={deleteOpenModal} />
          {editModalIsOpen ? (
            <ConfirmModal
              editModalIsOpen={editModalIsOpen}
              setEditModalIsOpen={setEditModalIsOpen}
              onClick={deletePost}
              children="本当に削除"
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ReportEdit;
