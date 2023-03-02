import React from 'react'
import DefaultLayout from '../components/layout/dafaultLayout'
import PrimaryButton from '../components/button/PrimaryButton'
import RegisterStyle from '../styles/pages/register.module.scss'
const Register = () => {
  return (
   <>
    <DefaultLayout>
    <PrimaryButton children={"登録"} onClick={()=>alert("登録できました")}/>
    <p className={RegisterStyle.txtOrange}>アカウントをお持ちですか？</p>
    </DefaultLayout></>
  )
}

export default Register
