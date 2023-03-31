import axios from "axios";
import React, { useEffect } from "react";
import DefaultLayout from "../components/layout/defaultLayout";
import reportPostStyle from "../../src/styles/reportPost/reportAll.module.scss";
import Cookies from "js-cookie";
import { PostAll } from "../types/Types";
import { categoryGroup } from "../types/Types";
import PieGraph from "../components/chart/pieGraph";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { expenceCategoryDate } from "../CategoryDate";
const ReportAll = () => {
  // ログイン中のユーザーidを取得
  const id = Cookies.get("id");

  const [postAll, setPostAll] = React.useState<PostAll[]>([]);
  console.log(postAll, "postAll");
  // カレンダーによる絞り込み
  //  初期値に現在の年月の設定
  const today = new Date();
  const currentDate =
    today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2);

  const [selectedDate, setSelectedDate] = React.useState(currentDate);
  console.log(selectedDate, "selectedDate");

  const filterDate = postAll?.filter(
    (post) => post.createdAt.slice(0, 7) === selectedDate
  );

  const total = filterDate?.reduce((sum, post) => sum + post.expence, 0);
  console.log(total, "total");
  // 項目ごとの小計
  const selectedCategoryGroup = filterDate?.reduce<categoryGroup[]>(
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
        exists.subtotal += cur.expence;
        return prev;
      } else {
        // ないなら後ろに追加する
        return [
          ...prev,
          {
            categoryId: cur.categoryId,
            subtotal: cur.expence,
            name: cur.category.name,
            color: cur.category.color,
          },
        ];
      }
    },
    // prevの初期値
    []
  );
  // subtotalが0円の項目をfilterして非表示へ
  const filterCategoryGroup = selectedCategoryGroup.filter(
    (data: any) => data.subtotal > 0
  );

  console.log("selectedCategoryGroup", selectedCategoryGroup);

  useEffect(() => {
    axios.get(`/post/${id}`).then((response) => {
      setPostAll(response.data);
    });
  }, []);
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <div className={reportPostStyle.container}>
        <div>
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
              <input type="text" id="expence" value={total} readOnly />円
            </div>
          </form>
        </div>

        <div className={reportPostStyle.pie}>
          {filterCategoryGroup.length > 0 ? (
            <PieGraph selectedCategoryGroup={selectedCategoryGroup} />
          ) : (
            <p>まだ指定月のデータはありません</p>
          )}
        </div>
        <div>
          {filterCategoryGroup?.map((data: any, index) => {
            return (
              <React.Fragment key={data.categoryId}>
                <button
                  className={reportPostStyle.block}
                  onClick={() =>
                    navigate(`/report/${data.categoryId}`, {
                      state: selectedDate,
                    })
                  }
                >
                  <table>
                    <tbody>
                      <tr>
                        <th className={reportPostStyle.textLeft}>
                          {data.name}
                        </th>
                        <th className={reportPostStyle.subtotal}>
                          {data.subtotal}円
                        </th>
                        <th className={reportPostStyle.ratio}>
                          {((data.subtotal / total) * 100).toFixed(1)}%
                        </th>
                        <th>
                          <ArrowForwardIosIcon />
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </DefaultLayout>
  );
};
export default ReportAll;
