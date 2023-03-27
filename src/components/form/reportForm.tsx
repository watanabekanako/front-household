import React, {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import reportPostStyle from "../../styles/reportPost/reportPost.module.scss";
import { inputDate, inputPrice, inputMemo } from "../../features/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { PostState, RootState } from "../../types/Types";
import { ArrowLeft } from "phosphor-react";

const ReportForm = forwardRef((props: any, ref) => {
  // const { state } = props;
  const location = useLocation();
  const currentLocation = location.pathname;
  const dispatch = useDispatch();

  const reportAlert = useSelector((state: RootState) => state.posts.alert);

  //詳細ページからのデータ受け取り
  const { state } = useLocation();
  const postState = state;
  const postDate = postState?.createdAt?.slice(0, 10);

  //現在日付の変換（yyyy/mm/dd）
  let dt = new Date();
  let y = dt.getFullYear();
  let m = ("00" + (dt.getMonth() + 1)).slice(-2);
  let d = ("00" + dt.getDate()).slice(-2);
  let todayDate = y + "-" + m + "-" + d;

  const [memo, setMemo] = useState(
    currentLocation.startsWith("/edit") ? postState?.content : ""
  );
  const [price, setPrice] = useState(
    currentLocation.startsWith("/edit") ? postState?.price : 0
  );
  const [date, setDate] = useState(
    currentLocation.startsWith("/edit") ? postDate : todayDate
  );

  //一瞬だけreduxに入るが初期値に戻る動きの解消
  useEffect(() => {
    if (memo === postState?.content) {
      dispatch(inputMemo(postState?.content));
    } else {
      dispatch(inputMemo(memo));
    }
    if (price === postState?.price) {
      dispatch(inputPrice(postState?.price));
    } else {
      dispatch(inputPrice(price));
    }
    if (date === postDate) {
      dispatch(inputDate(postDate));
    } else {
      dispatch(inputDate(date));
    }
  }, []);

  const changeMemo = (e: ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
    if (e.target.value !== postState?.content) {
      dispatch(inputMemo(e.target.value));
    }
  };

  const handleExpence = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
    if (e.target.value !== postState?.price) {
      dispatch(inputPrice(Number(e.target.value)));
    }
  };

  const changeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    if (e.target.value !== postDate) {
      dispatch(inputDate(e.target.value));
    }
  };

  useImperativeHandle(ref, () => ({
    clearForm: () => {
      setMemo("");
      setPrice(0);
      setDate("");
    },
  }));

  return (
    <div className={reportPostStyle.container}>
      {currentLocation.startsWith("/edit") ? (
        <div>
          <Link to="/">
            <ArrowLeft size={24} />
          </Link>
        </div>
      ) : (
        ""
      )}
      <form>
        <div className={reportPostStyle.postList}>
          <label htmlFor="date">日付</label>
          <input type="date" id="date" value={date} onChange={changeDate} />
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
            value={price}
            onChange={handleExpence}
          />
          円
        </div>
      </form>
      {reportAlert ? <p>入力してください</p> : ""}
    </div>
  );
});

export default ReportForm;
