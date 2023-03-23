import React from "react";
import DefaultLayout from "../components/layout/dafaultLayout";
import PrimaryButton from "../components/button/PrimaryButton";
import LoginStyle from "../styles/pages/login.module.scss";
import EmailInput from "../components/form/emailInput";
import PasswordInput from "../components/form/passwordInput";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FormState } from "../types/Types";
import axios from "axios";
import { response } from "express";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const formEmail = useSelector((state: FormState) => state.authForm.email);
  const formPassword = useSelector(
    (state: FormState) => state.authForm.password
  );
  console.log("formEmail", formEmail);
  console.log("formPassword", formPassword);

  const storedJwt = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = React.useState<any>();

  const handleLogin = () => {
    axios.post("/auth/login", {
      email: formEmail,
      password: formPassword,
    });

    alert("ログイン成功"); //

    axios.get("/user").then((response) => {
      // ログインしているユーザー情報の取得
      setLoginUser(response.data);
      // document.cookie =`id=${loginUser?.id}`
      document.cookie = `id=${response.data.id}`;

      console.log((document.cookie = `id=${response.data.id}`));
    });
    navigate("/home");
  };
  const handleLogout = () => {
    axios.post("/auth/logout", {});
    alert("ログアウト");
    document.cookie = "id=; max-age=0";
    // localStorage.setItem("token","")
  };
  return (
    <>
      <DefaultLayout>
        <EmailInput />
        <PasswordInput />
        <PrimaryButton
          children={"ログインする"}
          onClick={() => handleLogin()}
        />
        {/* <PrimaryButton
          children={"ログアウトする"}
          onClick={() => handleLogout()}
        /> */}
        <p>アカウントを持っていませんか？</p>
        <div className={LoginStyle.linkCenter}>
          <Link to="/" className={LoginStyle.txtOrange}>
            新規登録
          </Link>
        </div>
      </DefaultLayout>
    </>
  );
};
export default Login;
