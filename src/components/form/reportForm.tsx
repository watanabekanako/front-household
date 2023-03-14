import React, { useEffect, useState } from "react";
import reportPostStyle from "../../styles/reportPost/reportPost.module.scss";
import { inputDate, inputPrice, inputMemo } from "../../features/postSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const ReportForm = () => {
  const [onePost, setOnePost] = useState<any>([]);
  console.log(onePost.id, 90);
  const [memo, setMemo] = useState(onePost.content);
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();
  const params = useParams();
  console.log(onePost.content, 11);

  useEffect(() => {
    axios.get(`/post/${params.id}`).then((res) => setOnePost(res.data));
  }, []);

  // console.log(onePost.content);

  const postDate = onePost.createdAt?.slice(0, 10);

  const changeMemo = (e: any) => {
    setMemo(e.target.value);
    dispatch(inputMemo(e.target.value));
  };

  const handleExpence = (e: any) => {
    setPrice(e.target.value);
    dispatch(inputPrice(e.target.value));
  };

  return (
    <div className={reportPostStyle.container}>
      {/* formで日付、メモ、金額をまとめてdispatchするか */}
      <form>
        <div className={reportPostStyle.postList}>
          <label htmlFor="date">日付</label>
          <input
            type="date"
            id="date"
            value={postDate}
            onChange={(e: any) => dispatch(inputDate(e.target.value))}
          />
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
            placeholder={onePost.price}
            onChange={handleExpence}
          />
          円
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
