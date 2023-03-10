import React from 'react'
import DefaultLayout from '../components/layout/dafaultLayout'
import PrimaryButton from '../components/button/PrimaryButton'
import LoginStyle from '../styles/pages/login.module.scss'
import EmailInput from '../components/form/emailInput'
import PasswordInput from '../components/form/passwordInput'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
const Login = () => {
  const formEmail=useSelector((state:any)=>state.posts.email);
  const formPassword =useSelector((state:any)=>state.posts.password);
  console.log("formEmail",formEmail)
  console.log("formPassword",formPassword)
  const handleLogin=()=>{
    try{
      axios.post("/auth/login",{
        email:formEmail,
        password:formPassword
      })
    }catch(error:any){

    }
  }
  return (
  <>
   <DefaultLayout>
   <EmailInput/>
    <PasswordInput/>
    <PrimaryButton children={"ログインする"} onClick={()=>handleLogin()}/>
    <p>アカウントを持っていませんか？</p>
    <div className={LoginStyle.linkCenter}><Link to="/" className={LoginStyle.txtOrange}>新規登録</Link></div>
    </DefaultLayout>
    </>
  )
}
export default Login;
