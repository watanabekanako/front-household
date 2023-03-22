import axios from "axios";
import React, { useEffect } from "react";
import DefaultLayout from "../components/layout/dafaultLayout";
import reportPostStyle from "../../src/styles/reportPost/reportPost.module.scss";
import Cookies from "js-cookie";
import { PostAll } from "../types/Types";
import { categoryGroup } from "../types/Types";
import { useDispatch, useSelector } from "react-redux";
import PieGraph from "../components/chart/pieGraph";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { startOfMonth, endOfMonth } from "date-fns";
import format from "date-fns/format";

import moment from "moment";
const ReportAll = () => {
  // ログイン中のユーザーidを取得
  const id = Cookies.get("id");

  const [postAll, setPostAll] = React.useState<PostAll[]>();
  console.log(postAll, "postAll");
  const total = postAll?.reduce((sum, post) => sum + post.price, 0);
  console.log(total, "total");

  // 項目ごとの小計
  const selectedCategoryGroup = postAll?.reduce<categoryGroup[]>(
    (
      // 前にreturnした変数
      prev: any,
      // 今から処理するpostAllの要素
      cur: any
    ) => {
      // ===== この関数でreturnしたものが次のprevになる =====

      // prevの配列にcategoryIdが合致するものがあるか検索
      const exists = prev.find((i: any) => i.categoryId === cur.categoryId);

      if (exists) {
        // あるなら単純に足し合わせて返却(existsオブジェクトを書き換える)
        exists.subtotal += cur.price;
        return prev;
      } else {
        // ないなら後ろに追加する
        return [
          ...prev,
          {
            categoryId: cur.categoryId,
            subtotal: cur.price,
            name: cur.category.name,
          },
        ];
      }
    },
    // prevの初期値
    []
  );
  console.log("selectedCategoryGroup", selectedCategoryGroup);

  useEffect(() => {
    axios.get(`/post/${id}`).then((response) => {
      setPostAll(response.data);
    });
  }, []);

  // idの条件でfilter掛けている　ここを月日で制限掛けたい
  // const monthDate = postAll?.filter((data: any) => data?.id > 1);

  const [filterMonth, setFilterMonth] = React.useState<any>();

  const monthDate = () => {
    const month = postAll?.filter((data: any) => data?.id > 2);
    setFilterMonth(month);
    alert("yyyy");
  };
  console.log(filterMonth, "filter");
  const [startDate, setStartDate] = React.useState(new Date());

  const [value, setValue] = React.useState<any>();
  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  // 日付によるフィルター
  // valueに日付入っている
  // console.log(value, "month");
  // const month = dayjs(value).month() + 1;
  // const year = dayjs(value).year();
  // console.log(year, "year");
  // console.log(month, "month");
  // console.log(`http://localhost:3005/term=${year}${month}`, "url");

  // const month = format(value, "yyyyMMdd");
  // const month = format(value ?? null, "yyyy-MM-dd");
  // console.log(month, "month");

  const now = new Date(value);
  const startMonth = startOfMonth(now);
  console.log(startMonth, "start");
  // console.log(transferMonth, "transfer");
  const endMonth = endOfMonth(now);
  console.log(endMonth, "end");

  console.log(value, "value");
  const selectedMonth = postAll?.filter(
    (date) => Number(date.updatedAt) < Number(startMonth)
  );
  console.log(Number(startMonth));
  console.log(String(startMonth), "string");
  console.log(selectedMonth, "filter");
  return (
    <DefaultLayout>
      <div className={reportPostStyle.container}>
        <form>
          <div className={reportPostStyle.postList}>
            <label htmlFor="month"> 期間</label>

            <div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer
                  components={["DatePicker", "DatePicker", "DatePicker"]}
                >
                  <DatePicker
                    label={'"month" and "year"'}
                    views={["month", "year"]}
                    onChange={handleChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>

          <div className={reportPostStyle.postList}>
            <label htmlFor="expence">支出合計</label>
            <input type="text" id="expence" value={total} />円
          </div>
        </form>
      </div>
      <div>
        {postAll?.map((data: any) => {
          return (
            <>
              {data.category.name}
              {data.price}
              {data.updatedAt}
            </>
          );
        })}
      </div>
      {/* <button onClick={monthDate}>ボタン</button>
      <div>
        {postAll?.map((data: any) => {
          return (
            <>
              {data.category.name}
              {data.price}
            </>
          );
        })}
      </div> */}
      <div>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider> */}
      </div>
      <div>
        {filterMonth?.map((data: any) => {
          return (
            <>
              {data.category.name}
              {data.price}
            </>
          );
        })}
      </div>
      <div>
        {selectedMonth?.map((data: any) => {
          return <> {data.content}</>;
        })}
      </div>
      <PieGraph selectedCategoryGroup={selectedCategoryGroup} />
      <div>
        {selectedCategoryGroup?.map((data) => {
          return (
            <>
              <div className={reportPostStyle.container}>
                <div className={reportPostStyle.postList}>
                  <label>{data.name}</label>
                  {data.subtotal}円
                </div>
              </div>
            </>
          );
        })}
      </div>
    </DefaultLayout>
  );
};

export default ReportAll;
// // 期間の始めと終わりを指定
// ?start=20230301&end=20230331
// // 対象の年月を指定
// ?term=202303
