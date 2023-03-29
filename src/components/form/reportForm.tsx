import React, {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import reportPostStyle from "../../styles/reportPost/reportPost.module.scss";
import { inputDate, inputPrice, inputMemo } from "../../features/postSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment";

const ReportForm = forwardRef((props, ref) => {
  const location = useLocation();
  const currentLocation = location.pathname;
  const dispatch = useDispatch();

  //詳細ページからのデータ受け取り
  const { state } = useLocation();
  const postState = state;
  const postDate = postState?.createdAt?.slice(0, 10);

  const todayDate = new Date();

  //パスによって初期値変更
  const [memo, setMemo] = useState<string>(
    currentLocation.startsWith("/edit") ? postState?.content : ""
  );
  const [price, setPrice] = useState(
    currentLocation.startsWith("/edit") ? postState?.price : 0
  );
  const [date, setDate] = useState<string>(
    currentLocation.startsWith("/edit")
      ? postDate
      : moment(todayDate).format("YYYY-MM-DD")
  );

  //初期値をreduxへいれる（/homeと/editで変更）
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

  //e.target.valueAsNumber
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

  const clearInitialPrice = () => {
    if (price === 0) {
      setPrice("");
    }
  };

  return (
    <div className={reportPostStyle.container}>
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
            onClick={clearInitialPrice}
          />
          円
        </div>
      </form>
      {/* {reportAlert ? <p>入力してください</p> : ""} */}
    </div>
  );
});

export default ReportForm;
