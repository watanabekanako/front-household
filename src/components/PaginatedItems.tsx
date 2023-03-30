import React, { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import reportCategoryStyle from "../../src/styles/reportPost/reportCategory.module.scss";

const PaginatedItems = ({ filterDate, handlePageChange }: any) => {
  const [offset, setOffset] = useState(0); // 何番目のアイテムから表示するか
  const perPage: number = 5; // 1ページあたりに表示したいアイテムの数
  console.log(filterDate);
  // クリック時のfunction
  // const handlePageChange = (data: any) => {
  //   let page_number = data["selected"]; // クリックした部分のページ数が{selected: 2}のような形で返ってくる
  //   setOffset(page_number * perPage); // offsetを変更し、表示開始するアイテムの番号を変更
  // };
  // console.log(offset, "offset");
  return (
    <>
      {/* <div>
        {filterDate
          .slice(offset, offset + perPage) // 表示したいアイテムをsliceで抽出
          .map((data: any) => {
            return (
              <div>
                <p>{data.id}</p>
                <p>{data.category.name}</p>
                <p>{data.price}円</p>
              </div>
            );
          })}
      </div> */}
      {/* ページネーションを置きたい箇所に以下のコンポーネントを配置 */}
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={Math.ceil(filterDate.length / perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
        marginPagesDisplayed={2} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
        pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
        onPageChange={handlePageChange} // クリック時のfunction
        containerClassName={reportCategoryStyle.pagination} // ページネーションであるulに着くクラス名
        // subContainerClassName={"pages pagination"}
        activeClassName={reportCategoryStyle.active} // アクティブなページのliに着くクラス名
        previousClassName={reportCategoryStyle.pagination__previous} // 「<」のliに着けるクラス名
        nextClassName={reportCategoryStyle.pagination__next} // 「>」のliに着けるクラス名
        disabledClassName={reportCategoryStyle.pagination__disabled} // 使用不可の「<,>」に着くクラス名
      />
    </>
  );
};

export default PaginatedItems;
