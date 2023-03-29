import DefaultLayout from "../components/layout/defaultLayout";
import PrimaryButton from "../components/button/PrimaryButton";
import RegisterStyle from "../styles/pages/register.module.scss";
import PasswordInput from "../components/form/passwordInput";
import EmailInput from "../components/form/emailInput";
import ConfirmPasswordInput from "../components/form/confirmPasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FormState } from "../types/Types";
import React, { useEffect, useState } from "react";

const Register = () => {
  // const [post, setPost] = useState([]);

  const navigate = useNavigate();

  const formEmail = useSelector((state: FormState) => state.authForm.email);
  const formPassword = useSelector(
    (state: FormState) => state.authForm.password
  );
  const formConfirmPassword = useSelector(
    (state: FormState) => state.authForm.confirmPassword
  );
  const formError = useSelector((state: FormState) => state.authForm.error);
  console.log("formEmail", formEmail);
  console.log("formPassword", formPassword);
  console.log("formError", formError);
  const dispatch = useDispatch();
  const [alertEmailMessage, setAlertEmailMessage] =
    React.useState<boolean>(false);
  const [alertPasswordMessage, setAlertPasswordMessage] =
    React.useState<boolean>(false);
  const [alertConfirmPass, setAlertConfirmPass] =
    React.useState<boolean>(false);
  const [alertExitEmail, setAlertExitEmail] = React.useState<boolean>(false);
  const [error, setError] = React.useState("");
  // const handleClick = () => {
  //   if (formEmail.length > 1 && formPassword.length > 1) {
  //     try {
  //       axios.post("http://localhost:3005/auth/signup", {
  //         email: formEmail,
  //         password: formPassword,
  //       });
  //       navigate("/login");
  //     } catch (error) {
  //       if (error) console.log("ユーザー登録失敗しました");
  //     }
  //   }
  //   navigate("/login");
  // };

  const handleClick = async () => {
    // if (formEmail.length < 1) {
    //   setAlertEmailMessage(true);
    //   // 確認用パスワードとの一致の確認
    // if (formPassword !== formConfirmPassword) {
    //   setAlertConfirmPass(true);
    // }
    // } else {
    // }
    if (formEmail.length < 1) {
      setAlertEmailMessage(true);
      if (formPassword.length < 1) {
        setAlertEmailMessage(true);
        if (formPassword !== formConfirmPassword) {
          setAlertConfirmPass(true);
        }
      }
    } else {
      try {
        await axios.post("http://localhost:3005/auth/signup", {
          email: formEmail,
          password: formPassword,
        });
        navigate("/login");
      } catch (error: any) {
        // if (
        //   error.response &&
        //   error.response.status === 500 &&
        //   error.response.message
        // ) {
        //   console.log(error.response.message, "message");
        // }
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <DefaultLayout>
        <EmailInput userEmail="" />
        {alertEmailMessage ? <p>メールアドレスを入力してください</p> : ""}
        {alertExitEmail ? <p>すでに登録されているメールアドレスです</p> : ""}
        <PasswordInput />
        {alertPasswordMessage ? (
          <p>パスワードを入力してくださいを入力してください</p>
        ) : (
          ""
        )}
        {error}
        <ConfirmPasswordInput />
        {alertConfirmPass ? <p>パスワードが一致していません</p> : ""}
        <PrimaryButton children={"登録"} onClick={() => handleClick()} />
        <p>アカウントをお持ちですか？</p>
        <div className={RegisterStyle.linkCenter}>
          <Link to="/login" className={RegisterStyle.txtOrange}>
            ログインする
          </Link>
        </div>
      </DefaultLayout>
    </>
  );
};
export default Register;
