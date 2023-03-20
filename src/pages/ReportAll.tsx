import axios from "axios";
import React, { useEffect } from "react";
import DefaultLayout from "../components/layout/dafaultLayout";
import reportPostStyle from "../../src/styles/reportPost/reportPost.module.scss";
import Cookies from "js-cookie";
import { PostAll } from "../types/Types";
import { categoryGroup } from "../types/Types";
import { useDispatch, useSelector } from "react-redux";
import PieGraph from "../components/chart/pieGraph";
const ReportAll = () => {
  // ログイン中のユーザーidを取得
  const id = Cookies.get("id");

  const [postAll, setPostAll] = React.useState<PostAll[]>();
  console.log(postAll, "postAll");
  const total = postAll?.reduce((sum, post) => sum + post.price, 0);
  console.log(total, "total");

  // redux
  // const dispatch = useDispatch();
  // const categoryName = useSelector((state: any) => state.categoryGroup.name);
  // const categorySubtotal = useSelector(
  //   (state: any) => state.categoryGroup.subtotal
  // );

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

  return (
    <DefaultLayout>
      <div className={reportPostStyle.container}>
        {/* formで日付、メモ、金額をまとめてdispatchするか */}
        <form>
          <div className={reportPostStyle.postList}>
            <label htmlFor="month"> 期間</label>
            <input
              type="month"
              id="date"
              // value={postDate}
              // onChange={(e: any) => dispatch(inputDate(e.target.value))}
            />
          </div>

          <div className={reportPostStyle.postList}>
            <label htmlFor="expence">支出合計</label>
            <input type="text" id="expence" value={total} />円
          </div>
        </form>
      </div>
      <button onClick={monthDate}>ボタン</button>
      <div>
        {postAll?.map((data: any) => {
          return (
            <>
              {data.category.name}
              {data.price}
            </>
          );
        })}
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
