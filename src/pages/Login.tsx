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
import { RootState } from "../types/Types";
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

  const [loginUser, setLoginUser] = React.useState<{
    email: string;
    password: string;
  }>();

  // エラーメッセージ
  const { successMsg, errorMsg } = toastItem();
  const [error, setError] = React.useState<string>();
  const handleLogin = () => {
    if (formEmail.length > 1 && formPassword.length > 1) {
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
          if (error.response && error.response.status === 400) {
            errorMsg("メールアドレスまたはパスワードが間違っています");
          }
          setError(error.response.data.message);
        });
    }
  };

  return (
    <>
      <DefaultLayout>
        <EmailInput userEmail="" />
        <PasswordInput />
        {error}
        <PrimaryButton
          children={"ログインする"}
          onClick={() => handleLogin()}
        />
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
