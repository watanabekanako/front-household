import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../components/layout/defaultLayout";
import PrimaryButton from "../components/button/PrimaryButton";
import PasswordInput from "../components/form/passwordInput";
import EmailInput from "../components/form/emailInput";
import AccountStyle from "../styles/pages/account.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState, UserData } from "../types/Types";
import Cookies from "js-cookie";
import toastItem from "../components/modal/Toast";

const Account: React.FC = () => {
  const userNewEmail = useSelector((state: RootState) => state.authForm.email);
  const userNewPass = useSelector(
    (state: RootState) => state.authForm.password
  );

  const [userData, setUserData] = useState<UserData>();
  const userId = Cookies.get("id");
  const passwordRef = useRef<HTMLFormElement>(null);

  const { successMsg } = toastItem();

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`/user/${userId}`);
      setUserData(response.data);
    };
    getUser();
  }, []);

  const handleClick = async () => {
    const newUserItem = {
      email: userNewEmail,
      password: userNewPass,
    };
    await axios.patch(`/user/${userId}`, newUserItem);
    successMsg("アカウント情報を更新しました");
    if (passwordRef.current !== null) {
      passwordRef.current?.clearPass();
    }
  };
  return (
    <>
      <DefaultLayout>
        <div className={AccountStyle.accountContainer}>
          <h3>メールアドレスの変更</h3>
          <EmailInput userEmail={userData?.email ? userData.email : ""} />
          <h3>パスワードの変更</h3>
          <p>※セキュリティ保護のため現在のパスワードは非表示</p>
          <PasswordInput ref={passwordRef} />
          <PrimaryButton children={"登録"} onClick={() => handleClick()} />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Account;
