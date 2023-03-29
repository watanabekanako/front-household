import React from "react";
import DefaultLayout from "../components/layout/defaultLayout";
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
import toastItem from "../components/modal/Toast";
import { toast } from "react-toastify";
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

  const { successMsg } = toastItem();

  const handleLogin = () => {
    axios
      .post("/auth/login", {
        email: formEmail,
        password: formPassword,
      })
      .then((response) => {
        axios.get("/user").then((response) => {
          setLoginUser(response.data);
          document.cookie = `id=${response.data.id}`;
        });

        successMsg("ログインしました");
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        alert("ログインに失敗しました");
      });
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
