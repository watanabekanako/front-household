import React from 'react'
import DefaultLayout from '../components/layout/dafaultLayout'
import PrimaryButton from '../components/button/PrimaryButton'
import LoginStyle from '../styles/pages/login.module.scss'
const Login = () => {
  return (
  <>
   <DefaultLayout>
    <PrimaryButton children={"ログインする"} onClick={()=>alert("登録できました")}/>
    <p>アカウントを持っていませんか？</p>
    <p className={LoginStyle.txtOrange}>ログインする</p>
    </DefaultLayout>
    </>
  )
}

export default Login
