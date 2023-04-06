import axios from "axios";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/layout/defaultLayout";
import reportCategoryStyle from "../../src/styles/reportPost/reportCategory.module.scss";
import Cookies from "js-cookie";
import { Link, useParams, useLocation } from "react-router-dom";
import moment from "moment";
import { PostAll } from "../types/Types";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PaginatedItems from "../components/PaginatedItems";
import Select from "react-select";
const ReportCategory = () => {
  const navigate = useNavigate();
  const params = useParams();
  const categoryId = params.id;
  const [selectedCategoryPost, setSelectedCategoryPost] = useState<PostAll[]>(
    []
  );
  // ログイン中のユーザーidを取得
  const id = Cookies.get("id");

  useEffect(() => {
    axios.get(`/post/category/${categoryId}`).then((response) => {
      setSelectedCategoryPost(response.data);
    });
  }, []);
  const filterCategory = selectedCategoryPost?.filter(
    (post: { authorId: number }) => post.authorId === Number(id)
  );
  //　 /report での選択した年月の文字列取得
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState<String>(location.state);

  // /report で選択した文字列ex.202303 　と一致するpostへ
  const filterDate = filterCategory?.filter((post) =>
    post.createdAt.startsWith(String(selectedDate))
  );
  console.log(filterDate);
  // ページング
  const [offset, setOffset] = useState(0); // 何番目のアイテムから表示するか
  const perPage: number = 5; // 1ページあたりに表示したいアイテムの数
  const handlePageChange = (data: any) => {
    let page_number = data["selected"]; // クリックした部分のページ数が{selected: 2}のような形で返ってくる
    setOffset(page_number * perPage); // offsetを変更し、表示開始するアイテムの番号を変更
  };
  // プルダウン
  const [selectedOptions, setSelectedOptions] = React.useState();
  const sortOptions = [
    { value: "asc", label: "金額(小さい順)" },
    { value: "desc", label: "金額(大きい順)" },
  ];
  const [sortOrder, setSortOrder] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const pulldown = sortOrder?.value;
  if (pulldown === "desc") {
    filterDate.sort((a, b) => b.expence - a.expence);
    filterDate.sort((a, b) => b.income - a.income);
  } else if (pulldown === "asc") {
    filterDate.sort((a, b) => a.expence - b.expence);
    filterDate.sort((a, b) => a.income - b.income);
  }

  return (
    <DefaultLayout>
      <div className={reportCategoryStyle.container}>
        {/* プルダウン */}
        <div className={reportCategoryStyle.pulldownContainer}>
          <Select
            value={sortOrder}
            onChange={(selectedOption: any) => setSortOrder(selectedOption)}
            options={sortOptions}
            className={reportCategoryStyle.pulldown}
          />
        </div>
        <div>
          {filterDate
            .slice(offset, offset + perPage) // 表示したいアイテムをsliceで抽出
            .map((data: PostAll) => {
              const price = data.expence > 0 ? data.expence : data.income;
              return (
                <button
                  className={reportCategoryStyle.block}
                  onClick={() => navigate(`/edit/${data.id}`, { state: data })}
                >
                  <table>
                    <tbody>
                      <tr>
                        <th className={reportCategoryStyle.date}>
                          {/* momentでの日付変換(data-fnsではinvalid valueとなる) */}
                          {moment(data.createdAt).format("YYYY年MM月DD日")}
                        </th>
                        <th className={reportCategoryStyle.date}></th>
                        <th className={reportCategoryStyle.date}></th>
                      </tr>
                      <tr>
                        <th>{data.category?.name}</th>
                        <th className={reportCategoryStyle.smallFont}>
                          {price}円
                        </th>
                        <th className={reportCategoryStyle.textRight}>
                          <ArrowForwardIosIcon />
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </button>
              );
            })}
        </div>
        <PaginatedItems
          filterDate={filterDate}
          itemsPerPage={4}
          handlePageChange={handlePageChange}
        />
      </div>
    </DefaultLayout>
  );
};

export default ReportCategory;
