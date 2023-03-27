import axios from "axios";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/layout/defaultLayout";
import reportCategoryStyle from "../../src/styles/reportPost/reportCategory.module.scss";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import moment from "moment";
import { PostAll } from "../types/Types";

const ReportCategory = () => {
  // ログイン中のユーザーidを取得
  const id = Cookies.get("id");

  const { slug } = useParams();
  console.log(slug, "slug");
  const [selectedCategoryPost, setSelectedCategoryPost] = useState<PostAll[]>();

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

  return (
    <DefaultLayout>
      <div>
        {filterCategory?.map((data: any) => {
          return (
            <>
              <div className={reportCategoryStyle.container}>
                <table className={reportCategoryStyle.fontStyle}>
                  <tbody className={reportCategoryStyle.tableWidth}>
                    <tr>
                      <th className={reportCategoryStyle.date}>
                        {/* momentでの日付変換(data-fnsではinvalid valueとなる) */}
                        {moment(data.createdAt).format("YYYY年MM月DD日")}
                      </th>
                      <td className={reportCategoryStyle.date}></td>
                    </tr>
                    <tr>
                      <th>{data.category?.name}</th>
                      <td>{data.price}円</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          );
        })}
      </div>
    </DefaultLayout>
  );
};

export default ReportCategory;
