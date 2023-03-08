import React from "react";
import { Link } from "react-router-dom";
import NaviStyles from "../styles/navigation/navigation.module.scss";

const Navigation = () => {
  return (
    <div>
      <nav className={NaviStyles.naviContainer}>
        <h1>家計簿</h1>
        <ul className={NaviStyles.naviList}>
          <li>
            <Link to="/">
              <img src={`${process.env.PUBLIC_URL}/pencil.png`} alt="Logo" />
              <p>入力</p>
            </Link>
          </li>
          <li>
            <Link to="/">
              <img src={`${process.env.PUBLIC_URL}/chart-pie.png`} alt="Logo" />
              <p>レポート</p>
            </Link>
          </li>
          <li>
            <Link to="/">
              <img src={`${process.env.PUBLIC_URL}/gear.png`} alt="Logo" />
              <p>設定</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
