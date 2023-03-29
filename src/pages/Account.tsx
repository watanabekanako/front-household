import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../components/layout/defaultLayout";
import PrimaryButton from "../components/button/PrimaryButton";
import PasswordInput from "../components/form/passwordInput";
import EmailInput from "../components/form/emailInput";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState, UserData } from "../types/Types";
import Cookies from "js-cookie";
import toastItem from "../components/modal/Toast";
const Account = () => {
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
        <div>
          <p>メールアドレスの変更</p>
          <EmailInput userEmail={userData?.email ? userData.email : ""} />
          <p>パスワードの変更</p>
          <PasswordInput ref={passwordRef} />
          <PrimaryButton children={"登録"} onClick={() => handleClick()} />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Account;
