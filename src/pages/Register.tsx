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
import loginStyle from "../styles/form/formStyle.module.scss";
const Register = () => {
  const navigate = useNavigate();
  const formEmail = useSelector((state: FormState) => state.authForm.email);
  const formPassword = useSelector(
    (state: FormState) => state.authForm.password
  );
  const formConfirmPassword = useSelector(
    (state: FormState) => state.authForm.confirmPassword
  );
  const dispatch = useDispatch();
  const [alertEmailMessage, setAlertEmailMessage] =
    React.useState<boolean>(false);
  const [alertPasswordMessage, setAlertPasswordMessage] =
    React.useState<boolean>(false);
  const [alertConfirmPass, setAlertConfirmPass] =
    React.useState<boolean>(false);
  const [alertExitEmail, setAlertExitEmail] = React.useState<boolean>(false);

  const handleClick = async (e: any) => {
    e.preventDefault();
    if (formEmail.length < 1) {
      setAlertEmailMessage(true);
    }
    if (formPassword.length < 1) {
      setAlertPasswordMessage(true);
    }
    if (formPassword !== formConfirmPassword) {
      setAlertConfirmPass(true);
    }
    if (formEmail.length > 1) {
      setAlertEmailMessage(false);
    }
    if (formPassword.length > 1) {
      setAlertPasswordMessage(false);
      try {
        await axios.post("/auth/signup", {
          email: formEmail,
          password: formPassword,
        });
        navigate("/login");
      } catch (error: any) {
        if (error.response.status === 500 && error.response.message) {
          setAlertExitEmail(error.response.data.message);
        }
      }
    }
  };
  console.log(alertEmailMessage);
  return (
    <>
      <DefaultLayout>
        <EmailInput userEmail="" />
        {alertEmailMessage ? (
          <p className={loginStyle.errorMessage}>
            メールアドレスを入力してください
          </p>
        ) : (
          ""
        )}
        {alertExitEmail ? (
          <p className={loginStyle.errorMessage}>
            すでに登録されているメールアドレスです
          </p>
        ) : (
          ""
        )}
        <PasswordInput />
        {alertPasswordMessage ? (
          <p className={loginStyle.errorMessage}>
            パスワードを入力してください
          </p>
        ) : (
          ""
        )}
        {/* {error} */}
        <ConfirmPasswordInput />
        {alertConfirmPass ? (
          <p className={loginStyle.errorMessage}>
            パスワードが一致していません
          </p>
        ) : (
          ""
        )}
        <PrimaryButton children={"登録"} onClick={(e: any) => handleClick(e)} />
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
