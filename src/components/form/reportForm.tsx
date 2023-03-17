import React, { useEffect, useState } from "react";
import reportPostStyle from "../../styles/reportPost/reportPost.module.scss";
import { inputDate, inputPrice, inputMemo } from "../../features/postSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { PostState } from "../../types/Types";

const ReportForm = (state: any) => {
  const location = useLocation();
  const currentLocation = location.pathname;
  const dispatch = useDispatch();

  // const { state } = useLocation();

  const postState = state.state;
  const postDate = postState?.createdAt?.slice(0, 10);

  const [memo, setMemo] = useState(
    currentLocation.slice(1, 5) === "edit" ? postState?.content : ""
  );
  const [price, setPrice] = useState(
    currentLocation.slice(1, 5) === "edit" ? postState?.price : 0
  );
  const [date, setDate] = useState(
    currentLocation.slice(1, 5) === "edit" ? postDate : ""
  );

  //一瞬だけreduxに入るが初期値に戻る動きの解消
  if (memo === postState?.content) {
    dispatch(inputMemo(postState?.content));
  }
  if (price === postState?.price) {
    dispatch(inputPrice(postState?.price));
  }
  if (date === postDate) {
    dispatch(inputDate(postDate));
  }

  const changeMemo = (e: any) => {
    setMemo(e.target.value);
    if (e.target.value !== postState?.content) {
      dispatch(inputMemo(e.target.value));
    }
  };

  const handleExpence = (e: any) => {
    setPrice(e.target.value);
    if (e.target.value !== postState?.price) {
      dispatch(inputPrice(Number(e.target.value)));
    }
  };

  const changeDate = (e: any) => {
    setDate(e.target.value);
    if (e.target.value !== postDate) {
      dispatch(inputDate(e.target.value));
    }
  };

  return (
    <div className={reportPostStyle.container}>
      {/* formで日付、メモ、金額をまとめてdispatchするか */}
      <form>
        <div className={reportPostStyle.postList}>
          <label htmlFor="date">日付</label>
          <input type="date" id="date" value={date} onChange={changeDate} />
        </div>
        <div className={reportPostStyle.postList}>
          <label htmlFor="memo">メモ</label>
          <input
            type="text"
            id="memo"
            value={memo}
            // placeholder={onePost.content}
            onChange={changeMemo}
          />
        </div>
        <div className={reportPostStyle.postList}>
          <label htmlFor="expence">支出</label>
          <input
            type="text"
            id="expence"
            value={price}
            // placeholder={onePost.price}
            onChange={handleExpence}
          />
          円
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
