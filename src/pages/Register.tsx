import DefaultLayout from "../components/layout/dafaultLayout";
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
  const [post, setPost] = useState([]);

  const navigate = useNavigate();

  const formEmail = useSelector((state: FormState) => state.authForm.email);
  const formPassword = useSelector(
    (state: FormState) => state.authForm.password
  );
  const formError = useSelector((state: FormState) => state.authForm.error);
  console.log("formEmail", formEmail);
  console.log("formPassword", formPassword);
  console.log("formError", formError);
  const dispatch = useDispatch();

  const handleClick = () => {
    // if(formEmail.length< 1){
    //   alert("アドレスを入力してください")
    // }else if(formPassword.length<1){
    //   alert("パスワードを入力してください")
    // }
    try {
      axios.post("http://localhost:3005/auth/signup", {
        email: formEmail,
        password: formPassword,
      });
      alert("完了");
      navigate("/login");
    } catch (error) {
      console.log("ユーザー登録失敗しました");
    }
  };

  useEffect(() => {
    axios.get("/post/9").then((res) => setPost(res.data));
  }, []);

  const clickNavi = () => {
    navigate("/edit/9", { state: post[0] });
  };

  return (
    <>
      <DefaultLayout>
        <EmailInput />
        <PasswordInput />
        <ConfirmPasswordInput />
        <PrimaryButton children={"登録"} onClick={() => handleClick()} />
        <p>アカウントをお持ちですか？</p>
        <div className={RegisterStyle.linkCenter}>
          <Link to="/login" className={RegisterStyle.txtOrange}>
            ログインする
          </Link>
        </div>
        <button onClick={clickNavi}>移動</button>
      </DefaultLayout>
    </>
  );
};
export default Register;
