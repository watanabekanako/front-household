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
const ReportAll = () => {
  // ログイン中のユーザーidを取得
  const id = Cookies.get("id");

  const [postAll, setPostAll] = React.useState<PostAll[]>([]);
  console.log(postAll, "postAll");
  // カレンダーによる絞り込み
  //  カレンダーによる絞り込み 初期値に現在の年月の設定
  const today = new Date();
  const currentDate =
    today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2);

  const [selectedDate, setSelectedDate] = React.useState(currentDate);
  console.log(selectedDate, "selectedDate");

  const filterDate = postAll?.filter(
    (post) => post.createdAt.slice(0, 7) === selectedDate
  );

  // 支出合計
  const expenceTotal = filterDate?.reduce((sum, post) => sum + post.expence, 0);
  // 収入合計
  const incomeTotal = filterDate?.reduce((sum, post) => sum + post.income, 0);
  console.log(incomeTotal, "incomeTotal");
  // 項目ごとの小計
  const selectedExpenceGroup = filterDate?.reduce<categoryGroup[]>(
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
  console.log(selectedExpenceGroup, "selectedExpence");
  // subtotalが0円の項目をfilterして非表示へ
  const filterExpenceGroup = selectedExpenceGroup.filter(
    (data: any) => data.subtotal > 0
  );
  console.log(filterExpenceGroup, "filterExoence");
  // incomeのsubtotal
  const selectedIncomeGroup = filterDate?.reduce<categoryGroup[]>(
    (prev: any, cur: any) => {
      const exists = prev.find((i: any) => i.categoryId === cur.categoryId);
      if (exists) {
        exists.subtotal += cur.income;
        return prev;
      } else {
        return [
          ...prev,
          {
            categoryId: cur.categoryId,
            subtotal: cur.income,
            name: cur.category.name,
            color: cur.category.color,
          },
        ];
      }
    },
    // prevの初期値
    []
  );

  const filterIncomeGroup = selectedIncomeGroup.filter(
    (data: any) => data.subtotal > 0
  );
  console.log(filterIncomeGroup, "income");
  useEffect(() => {
    axios.get(`/post/${id}`).then((response) => {
      setPostAll(response.data);
    });
  }, []);

  const navigate = useNavigate();

  // 収入支出ボタン切り替え
  const [isExpence, setIsExpence] = React.useState(true);

  // const [changeDate, setChangeDate] = React.useState(filterExpenceGroup);
  const [changeDate, setChangeDate] = React.useState(() => {
    const initialState = filterExpenceGroup;
    return initialState;
  });
  console.log(filterExpenceGroup, "初期値");

  const changeExpenceClick = () => {
    if (!isExpence) {
      setIsExpence(true);
    }
    setChangeDate(filterExpenceGroup);
  };
  const changeIncomeClick = () => {
    if (isExpence) {
      setIsExpence(false);
    }
    setChangeDate(filterIncomeGroup);
  };

  console.log(filterExpenceGroup, "filterCategoryGroup");
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
              <label htmlFor="expence">支出</label>
              <input
                type="text"
                id="expence"
                value={`−${expenceTotal}円`}
                readOnly
                className={reportPostStyle.expence}
              />
              <label htmlFor="expence">収入</label>
              <input
                type="text"
                id="income"
                value={`＋${incomeTotal}円`}
                readOnly
                className={reportPostStyle.income}
              />
            </div>
            <div className={reportPostStyle.postList}>
              <label htmlFor="expence">収支</label>
              <input
                type="text"
                id="expence"
                value={`${incomeTotal - expenceTotal}円`}
                readOnly
              />
            </div>
          </form>
        </div>
        <div className={reportPostStyle.categoryChange}>
          <button
            onClick={changeExpenceClick}
            className={isExpence ? reportPostStyle.changeButton : ""}
          >
            支出
          </button>
          <button
            onClick={changeIncomeClick}
            className={!isExpence ? reportPostStyle.changeButton : ""}
          >
            収入
          </button>
        </div>
        <div className={reportPostStyle.pie}>
          {filterExpenceGroup.length > 0 || filterIncomeGroup.length > 0 ? (
            <PieGraph
              filterExpenceGroup={filterExpenceGroup}
              filterIncomeGroup={filterIncomeGroup}
              changeDate={changeDate}
            />
          ) : (
            <p>まだ指定月のデータはありません</p>
          )}
        </div>
        <div>
          {changeDate?.map((data: any, index) => {
            return (
              <React.Fragment key={data.categoryId}>
                <>
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
                            {((data.subtotal / expenceTotal) * 100).toFixed(1)}%
                          </th>
                          <th>
                            <ArrowForwardIosIcon />
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </button>
                </>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </DefaultLayout>
  );
};
export default ReportAll;
