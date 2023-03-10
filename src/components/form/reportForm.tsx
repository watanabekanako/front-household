import React from "react";
import reportPostStyle from "../../styles/reportPost/reportPost.module.scss";
import { inputDate, inputPrice, inputMemo } from "../../features/postSlice";
import { useDispatch } from "react-redux";

const ReportForm = () => {
  const dispatch = useDispatch();

  return (
    <div className={reportPostStyle.container}>
      <form>
        <div className={reportPostStyle.postList}>
          <label htmlFor="date">日付</label>
          <input
            type="date"
            id="date"
            onChange={(e: any) => dispatch(inputDate(e.target.value))}
          />
        </div>
        <div className={reportPostStyle.postList}>
          <label htmlFor="memo">メモ</label>
          <input
            type="text"
            id="memo"
            onChange={(e: any) => dispatch(inputMemo(e.target.value))}
          />
        </div>
        <div className={reportPostStyle.postList}>
          <label htmlFor="expence">支出</label>
          <input
            type="text"
            id="expence"
            onChange={(e: any) => dispatch(inputPrice(e.target.value))}
          />
          円
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
