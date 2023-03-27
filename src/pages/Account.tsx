import React from "react";
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
const Account = () => {
  const handleClick = () => {
    // patch http://localhost:3005/user/120
  };
  return (
    <>
      <>
        <DefaultLayout>
          <h1>My Page</h1>
          <EmailInput />
          <PasswordInput />
          <ConfirmPasswordInput />
          <PrimaryButton children={"登録"} onClick={() => handleClick()} />
          <div className={RegisterStyle.linkCenter}>
            <Link to="/report" className={RegisterStyle.txtOrange}>
              レポートページへ戻る
            </Link>
          </div>
        </DefaultLayout>
      </>
    </>
  );
};

export default Account;
