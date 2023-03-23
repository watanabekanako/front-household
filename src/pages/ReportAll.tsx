import axios from "axios";
import React, { useEffect } from "react";
import DefaultLayout from "../components/layout/dafaultLayout";
import reportPostStyle from "../../src/styles/reportPost/reportAll.module.scss";
import Cookies from "js-cookie";
import { PostAll } from "../types/Types";
import { categoryGroup } from "../types/Types";
import PieGraph from "../components/chart/pieGraph";
import "react-datepicker/dist/react-datepicker.css";
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

  // カレンダーによる絞り込み
  const [selectedDate, setSelectedDate] = React.useState("");
  console.log(selectedDate, "selectedDate");

  const filterDate = postAll?.filter(
    (user) => user.updatedAt.slice(0, 7) === selectedDate
  );
  return (
    <DefaultLayout>
      <div className={reportPostStyle.container}>
        <form>
          <div className={reportPostStyle.postList}>
            <label htmlFor="month"> 期間</label>
            <input
              type="month"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            ></input>
          </div>

          <div className={reportPostStyle.postList}>
            <label htmlFor="expence">支出合計</label>
            <input type="text" id="expence" value={total} />円
          </div>
        </form>
      </div>
      {/* <div>
        {postAll?.map((data: any) => {
          return (
            <>
              {data.category.name}
              {data.price}
              {data.updatedAt}
            </>
          );
        })}
      </div> */}
      <div>
        {filterDate?.map((data: any) => {
          return (
            <>
              {data.category.name}
              {data.price}
              {data.updatedAt}
            </>
          );
        })}
      </div>
      <div className={reportPostStyle.pie}>
        <PieGraph selectedCategoryGroup={selectedCategoryGroup} />
      </div>
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
