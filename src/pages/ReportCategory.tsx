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
const ReportCategory = () => {
  // ログイン中のユーザーidを取得
  const id = Cookies.get("id");

  const navigate = useNavigate();
  const [selectedCategoryPost, setSelectedCategoryPost] = useState<PostAll[]>(
    []
  );

  const params = useParams();
  const categoryId = params.id;

  useEffect(() => {
    axios.get(`/post/category/${categoryId}`).then((response) => {
      setSelectedCategoryPost(response.data);
    });
  }, []);
  console.log(selectedCategoryPost);

  const filterCategory = selectedCategoryPost?.filter(
    (post: { authorId: number }) => post.authorId === Number(id)
  );
  console.log(filterCategory, "filter");

  //　 /report での選択した年月の文字列取得
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState<String>(location.state);
  console.log(selectedDate, "location");

  // /report で選択した文字列ex.202303 　と一致するpostへ
  const filterDate = filterCategory?.filter(
    (post) => post.createdAt.slice(0, 7) === selectedDate
  );

  return (
    <DefaultLayout>
      <div className={reportCategoryStyle.container}>
        {filterDate?.map((data: any) => {
          return (
            <React.Fragment key={data.id}>
              <button
                className={reportCategoryStyle.block}
                onClick={() => navigate(`/edit/${data.id}`, { state: data })}
              >
                {/* <Link
                  to={String(data.categoryId)}
                  className={reportCategoryStyle.arrow}
                > */}
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
                      {/* <th>{moment(data.createdAt).format("YYYY年MM月DD日")}</th> */}
                      <th>{data.category?.name}</th>
                      <th className={reportCategoryStyle.smallFont}>
                        {data.price}円
                      </th>
                      <th className={reportCategoryStyle.textRight}>
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
    </DefaultLayout>
  );
};

export default ReportCategory;
