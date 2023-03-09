import React, { useState } from 'react'
import DefaultLayout from '../components/layout/dafaultLayout'
import PrimaryButton from '../components/button/PrimaryButton'
import RegisterStyle from '../styles/pages/register.module.scss'
import PasswordInput from '../components/form/passwordInput'
import EmailInput from '../components/form/emailInput'
import ConfirmPasswordInput from '../components/form/confirmPasswordInput'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addForm } from '../features/Form'
const Register = () => {
  const formList=useSelector((state:any)=>state.posts.value);
  console.log("formList",formList)
  const dispatch= useDispatch();
  const[email,setEmail]=useState("")
  console.log(email,"email")
const handleClick=()=>{
  dispatch(addForm({
    email:email
  }))
  alert("完了")
}


  return (
   <>
    <DefaultLayout>
      <EmailInput inputEmail={(email:any)=>setEmail(email:email)}/>
      <PasswordInput/>
      <ConfirmPasswordInput/>
    <PrimaryButton children={"登録"} onClick={()=>handleClick()}/>
    <p>アカウントをお持ちですか？</p>
    <div className={RegisterStyle.linkCenter}><Link to="/login" className={RegisterStyle.txtOrange}>ログインする</Link>
    </div>
    </DefaultLayout></>
  )
}
export default Register;
