import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NaviStyles from "../styles/navigation/navigation.module.scss";
import { Pencil, ChartPie, SignIn, Gear, SignOut } from "phosphor-react";
import axios from "axios";
import ConfirmModal from "./modal/ConfirmModal";
import Cookies from "js-cookie";
import toastItem from "./modal/Toast";
import { useDispatch } from "react-redux";
import { addPassword } from "../features/formSlice";
const Navigation = () => {
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const cookie = document.cookie;
  const navigate = useNavigate();

  const userId = Cookies.get("id");
  const dispatch = useDispatch();
  const { successMsg } = toastItem();

  const logoutOpenModal = () => {
    setEditModalIsOpen(true);
  };

  const logout = async () => {
    await axios.post("/auth/logout", {});
    document.cookie = `id=${userId}; max-age=0`;
    setEditModalIsOpen(false);
    navigate("/login");
    successMsg("ログアウトしました");
    dispatch(addPassword(""));
  };
  return (
    <>
      <div className={NaviStyles.naviContainer}>
        <nav>
          <Link to="/home">
            {/* <h1>家計簿</h1> */}
            <img src={`${process.env.PUBLIC_URL}/logo2.png`} alt="Logo" />
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
                <ChartPie size={48} />
                <p>レポート</p>
              </Link>
            </li>
            <li>
              <Link to="/account">
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
          </ul>
        </nav>
      </div>
      {editModalIsOpen ? (
        <ConfirmModal
          editModalIsOpen={editModalIsOpen}
          setEditModalIsOpen={setEditModalIsOpen}
          onClick={logout}
          children="ログアウト"
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Navigation;
