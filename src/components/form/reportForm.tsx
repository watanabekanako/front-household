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
    currentLocation.startsWith("/edit")
      ? postState?.expence || postState?.income
      : 0
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
    if (price === postState?.expence) {
      dispatch(inputPrice(postState?.expence));
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
    if (e.target.value !== postState?.expence) {
      dispatch(inputPrice(Number(e.target.value)));
    }
  };

  const categoryGroups = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    if (e.target.value !== postDate) {
      dispatch(inputDate(e.target.value));
    }
  };

  useImperativeHandle(ref, () => ({
    clearForm: () => {
      setMemo("");
      setPrice(0);
      dispatch(inputPrice(0));
    },
  }));

  const clearInitialExpence = () => {
    if (price === 0) {
      setPrice("");
    }
  };

  return (
    <div className={reportPostStyle.container}>
      <form>
        <div className={reportPostStyle.postList}>
          <label htmlFor="date">日付</label>
          <input type="date" id="date" value={date} onChange={categoryGroups} />
        </div>
        <div className={reportPostStyle.postList}>
          <label htmlFor="memo">メモ</label>
          <input type="text" id="memo" value={memo} onChange={changeMemo} />
        </div>
        <div className={reportPostStyle.postList}>
          <label htmlFor="expence">収支</label>
          <input
            type="text"
            id="expence"
            value={price}
            onChange={handleExpence}
            onClick={clearInitialExpence}
          />
          円
        </div>
      </form>
    </div>
  );
});

export default ReportForm;
