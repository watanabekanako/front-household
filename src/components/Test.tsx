import React from "react";
import { categoryIdList } from "../CategoryDummyDate";

const Test = () => {
  // 選択した値を管理（初期値：ラジオ１）
  const [val, setVal] = React.useState(1);

  // ラジオボタンの値がチェンジされた時
  const handleChange = (e: any) => {
    setVal(e.target.value);
  };

  return (
    <>
      <h2>ラジオボタン</h2>
      <p className="center">「その他」を選択したら入力欄が表示されます</p>
      <div className="container">
        {categoryIdList.map((item) => {
          return (
            <div key={item}>
              <input
                type="radio"
                value={item}
                onChange={handleChange}
                checked={item === val}
              />
              <label>{item}</label>
            </div>
          );
        })}

        <p>選択したのは「{val}」です。</p>
        {/* {val === "その他" && (
          <p>
            <input type="text" />
          </p>
        )} */}
      </div>
    </>
  );
};

export default Test;
