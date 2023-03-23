import axios from "axios";
import React, { useEffect, useState } from "react";
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
import { isAfter } from "date-fns";
import { getDate, getMonth, getYear } from "date-fns";

const ReportCategory = () => {
  // ログイン中のユーザーidを取得
  const id = Cookies.get("id");
  console.log(id, "id");
  const [selectedCategoryPost, setSelectedCategoryPost] = useState<any>();

  const categoryId = 2;
  useEffect(() => {
    axios.get(`/post/category/${categoryId}`).then((response) => {
      setSelectedCategoryPost(response.data);
    });
  }, []);

  console.log(selectedCategoryPost);

  const filterCategory = selectedCategoryPost?.filter(
    (post: any) => post.authorId === Number(id)
  );
  console.log(filterCategory, "filter");
  return (
    <DefaultLayout>
      <div>
        {filterCategory?.map((data: any) => {
          return (
            <>
              <p> {data.createdAt}</p>
              <div>
                <label>{data.category?.name}</label>
                <span> {data.price}円</span>
              </div>
            </>
          );
        })}
      </div>
    </DefaultLayout>
  );
};

export default ReportCategory;
// // 期間の始めと終わりを指定
// ?start=20230301&end=20230331
// // 対象の年月を指定
// ?term=202303
// http://localhost:3005/post/category/2
