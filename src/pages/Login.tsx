import React from 'react'
import DefaultLayout from '../components/layout/dafaultLayout'
import PrimaryButton from '../components/button/PrimaryButton'
import LoginStyle from '../styles/pages/login.module.scss'
import EmailInput from '../components/form/emailInput'
import PasswordInput from '../components/form/passwordInput'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
  <>
   <DefaultLayout>
   <EmailInput/>
      <PasswordInput/>
    <PrimaryButton children={"ログインする"} onClick={()=>alert("登録できました")}/>
    <p>アカウントを持っていませんか？</p>
    <div className={LoginStyle.linkCenter}><Link to="/" className={LoginStyle.txtOrange}>新規登録</Link></div>
    </DefaultLayout>
    </>
  )
}

export default Login
