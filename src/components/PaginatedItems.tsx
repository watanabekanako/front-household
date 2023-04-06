import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import reportCategoryStyle from "../../src/styles/reportPost/reportCategory.module.scss";
import { PostAll } from "../types/Types";
type Props = {
  filterDate: PostAll[];
  handlePageChange: any;
  itemsPerPage: number;
};
const PaginatedItems = ({
  filterDate,
  handlePageChange,
  itemsPerPage,
}: Props) => {
  const [offset, setOffset] = useState(0); // 何番目のアイテムから表示するか
  const perPage: number = 5; // 1ページあたりに表示したいアイテムの数
  console.log(filterDate);

  return (
    <>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={Math.ceil(filterDate.length / perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
        marginPagesDisplayed={2} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
        pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
        onPageChange={handlePageChange} // クリック時のfunction
        containerClassName={reportCategoryStyle.pagination} // ページネーションであるulに着くクラス名
        activeClassName={reportCategoryStyle.active} // アクティブなページのliに着くクラス名
        previousClassName={reportCategoryStyle.pagination__previous} // 「<」のliに着けるクラス名
        nextClassName={reportCategoryStyle.pagination__next} // 「>」のliに着けるクラス名
        disabledClassName={reportCategoryStyle.pagination__disabled} // 使用不可の「<,>」に着くクラス名
      />
    </>
  );
};

export default PaginatedItems;
