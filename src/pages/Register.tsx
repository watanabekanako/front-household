import React from 'react'
import DefaultLayout from '../components/layout/dafaultLayout'
import PrimaryButton from '../components/button/PrimaryButton'
import RegisterStyle from '../styles/pages/register.module.scss'
import PasswordInput from '../components/form/passwordInput'
import EmailInput from '../components/form/emailInput'
import ConfirmPasswordInput from '../components/form/confirmPasswordInput'
import { Link } from 'react-router-dom'
const Register = () => {
  return (
   <>
    <DefaultLayout>
      <EmailInput/>
      <PasswordInput/>
      <ConfirmPasswordInput/>
    <PrimaryButton children={"登録"} onClick={()=>alert("登録できました")}/>
    <p>アカウントをお持ちですか？</p>
    <div className={RegisterStyle.linkCenter}><Link to="/login" className={RegisterStyle.txtOrange}>ログインする</Link>
    </div>
    </DefaultLayout></>
  )
}

export default Register;
