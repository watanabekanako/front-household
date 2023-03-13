import React, { useEffect, useState } from "react";
import reportPostStyle from "../../styles/reportPost/reportPost.module.scss";
import { inputDate, inputPrice, inputMemo } from "../../features/postSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const ReportForm = () => {
  const [memo, setMemo] = useState("");
  const [price, setPrice] = useState(0);
  const [onePost, setOnePost] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const fetchOnePost = async () => {
      const response = await axios.get(`/post/${params.id}`);
      setOnePost(response.data);
    };
    fetchOnePost();
  }, []);

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
      {onePost.map((post: any) => {
        return (
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
              <input type="text" id="memo" value={memo} onChange={changeMemo} />
            </div>
            <div className={reportPostStyle.postList}>
              <label htmlFor="expence">支出</label>
              <input
                type="text"
                id="expence"
                value={post.price}
                onChange={handleExpence}
              />
              円
            </div>
          </form>
        );
      })}
    </div>
  );
};

export default ReportForm;
