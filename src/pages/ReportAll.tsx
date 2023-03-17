import axios from "axios";
import React, { useEffect } from "react";
import DefaultLayout from "../components/layout/dafaultLayout";
import reportPostStyle from "../../src/styles/reportPost/reportPost.module.scss";
const ReportAll = () => {
  // useEffect(()=>{
  //     axios.get(`http://localhost:3005/user/${id}`,{

  //     })

  // })
  return (
    <DefaultLayout>
      <div className={reportPostStyle.container}>
        {/* formで日付、メモ、金額をまとめてdispatchするか */}
        <form>
          <div className={reportPostStyle.postList}>
            <label htmlFor="date"> 期間</label>
            <input
              type="date"
              id="date"
              // value={postDate}
              // onChange={(e: any) => dispatch(inputDate(e.target.value))}
            />
          </div>

          <div className={reportPostStyle.postList}>
            <label htmlFor="expence">支出合計</label>
            <input
              type="text"
              id="expence"
              // placeholder={onePost.price}
              // onChange={handleExpence}
            />
            円
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default ReportAll;
