import React, { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";

// // Example items, to simulate fetching from another resources.
// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

// function PaginatedItems({ itemsPerPage, filterDate }: any) {

//   const [itemOffset, setItemOffset] = useState(0);
//   console.log(itemOffset, "itemOffset");
//   const endOffset = itemOffset + itemsPerPage;
//   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//   // 記事の取り出し, ページングを押すことで変化する
//   const currentItems = items.slice(itemOffset, endOffset);
//   const pageCount = Math.ceil(filterDate.length / itemsPerPage);
//   console.log(pageCount, "pageCounet");
//   console.log(currentItems, "current");

//   const handlePageClick = (event: any) => {
//     const newOffset = (event.selected * itemsPerPage) % filterDate.length;
//     console.log(
//       `User requested page number ${event.selected}, which is offset ${newOffset}`
//     );
//     setItemOffset(newOffset);
//     // 0　or 4
//     console.log(newOffset, "newOffset");
//   };
//   console.log(filterDate, "childrenでのfilterDate");
//   console.log(itemsPerPage, "perPage");

//   const Items = ({ currentItems }: any) => {
//     return (
//       <>
//         {currentItems &&
//           currentItems.map((item: any) => (
//             <div>
//               <h3>Item #{item}</h3>
//             </div>
//           ))}
//       </>
//     );
//   };
//   return (
//     <>
//       <Items currentItems={currentItems} />
//       <ReactPaginate
//         breakLabel="..."
//         nextLabel="next >"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={5}
//         // ページ総数
//         pageCount={pageCount}
//         previousLabel="< previous"
//         // renderOnZeroPageCount={null}
//       />
//     </>
//   );
// }
const PaginatedItems = ({ filterDate }: any) => {
  const [offset, setOffset] = useState(0); // 何番目のアイテムから表示するか
  const perPage: number = 5; // 1ページあたりに表示したいアイテムの数
  console.log(filterDate);
  // クリック時のfunction
  const handlePageChange = (data: any) => {
    let page_number = data["selected"]; // クリックした部分のページ数が{selected: 2}のような形で返ってくる
    setOffset(page_number * perPage); // offsetを変更し、表示開始するアイテムの番号を変更
  };
  console.log(offset, "offset");
  return (
    <>
      <div>
        {filterDate
          .slice(offset, offset + perPage) // 表示したいアイテムをsliceで抽出
          .map((el: any) => {
            return (
              <div>
                <p>{el.id}</p>
                <p>{el.category.name}</p>
                <p>{el.price}円</p>
              </div>
            );
          })}
      </div>
      {/* ページネーションを置きたい箇所に以下のコンポーネントを配置 */}
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={Math.ceil(filterDate.length / perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
        marginPagesDisplayed={2} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
        pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
        onPageChange={handlePageChange} // クリック時のfunction
        containerClassName={"pagination"} // ページネーションであるulに着くクラス名
        // subContainerClassName={"pages pagination"}
        activeClassName={"active"} // アクティブなページのliに着くクラス名
        previousClassName={"pagination__previous"} // 「<」のliに着けるクラス名
        nextClassName={"pagination__next"} // 「>」のliに着けるクラス名
        disabledClassName={"pagination__disabled"} // 使用不可の「<,>」に着くクラス名
      />
    </>
  );
};

export default PaginatedItems;
