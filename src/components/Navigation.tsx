import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NaviStyles from "../styles/navigation/navigation.module.scss";
import { Pencil, ChartPie, SignIn, Gear, SignOut } from "phosphor-react";
import axios from "axios";
import ConfirmModal from "./modal/ConfirmModal";

const Navigation = () => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const cookie = document.cookie;
  console.log(cookie.includes("id"));
  const navigate = useNavigate();
  const isAdmin = true;

  const getCookieValue = (name: any) => {
    // cookieを;で区切って配列に分割する
    const cookies = document.cookie.split(";");

    // cookieからnameが一致するものを探す
    const targetCookie = cookies.find((cookie) => {
      // cookieの先頭に空白がある場合は除去する
      const trimmedCookie = cookie.trim();
      // cookieの名前と値を=で区切って配列に分割する
      const [cookieName, cookieValue] = trimmedCookie.split("=");
      return cookieName === name;
    });
    // 見つかった場合はcookieの値を返す
    if (targetCookie) {
      return targetCookie.split("=")[1];
    }
    // 見つからなかった場合はnullを返す
    return null;
  };
  const userId = getCookieValue("id");

  const logoutOpenModal = () => {
    setEditModalIsOpen(true);
  };

  const logout = () => {
    axios.post("/auth/logout", {});
    document.cookie = `id=${userId}; max-age=0`;
    setEditModalIsOpen(false);
    navigate("/login");
  };

  return (
    <div>
      <nav className={NaviStyles.naviContainer}>
        <Link to="/home">
          <h1>家計簿</h1>
        </Link>
        <ul className={NaviStyles.naviList}>
          <li>
            <Link to="/home">
              <Pencil size={48} />
              <p>入力</p>
            </Link>
          </li>
          <li>
            <Link to="/report">
              <img src={`${process.env.PUBLIC_URL}/chart-pie.png`} alt="Logo" />
              <p>レポート</p>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Gear size={48} />
              <p>設定</p>
            </Link>
          </li>
          {!cookie.includes("id") ? (
            <li>
              <Link to="/login">
                <SignIn size={48} />
                <p>ログイン</p>
              </Link>
            </li>
          ) : (
            <li>
              <button onClick={logoutOpenModal}>
                <SignOut size={48} />
                <p>ログアウト</p>
              </button>
            </li>
          )}
          {editModalIsOpen ? (
            <ConfirmModal
              editModalIsOpen={editModalIsOpen}
              setEditModalIsOpen={setEditModalIsOpen}
              onClick={logout}
              isAdmin={isAdmin}
            />
          ) : (
            ""
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
