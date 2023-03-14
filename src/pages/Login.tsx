import React from 'react'
import DefaultLayout from '../components/layout/dafaultLayout'
import PrimaryButton from '../components/button/PrimaryButton'
import LoginStyle from '../styles/pages/login.module.scss'
import EmailInput from '../components/form/emailInput'
import PasswordInput from '../components/form/passwordInput'
import { Link } from 'react-router-dom'
import { useSelector ,useDispatch} from 'react-redux'
import { FormState } from '../types/Types'
import axios from 'axios'
const Login = () => {
  const formEmail=useSelector((state:FormState)=>state.authForm.email);
  const formPassword=useSelector((state:FormState)=>state.authForm.password);
  console.log("formEmail",formEmail)
  console.log("formPassword",formPassword)


  const storedJwt = localStorage.getItem('token');
  const dispatch= useDispatch();



  
  const handleLogin=()=>{
  
      axios.post("/auth/login",{
        email:formEmail,
        password:formPassword
      },{ withCredentials: true} )

      alert("ログイン成功")

// localStorage.setItem("token",formEmail)
axios.get("http://localhost:3005/user", {
  withCredentials: true
})
  }
  const handleLogout=()=>{
  
    axios.post("/auth/logout",{

    })

    alert("ログアウト")

// localStorage.setItem("token","")
}
  return (
  <>
   <DefaultLayout>
   <EmailInput/>
    <PasswordInput/>
    <PrimaryButton children={"ログインする"} onClick={()=>handleLogin()}/>
    <PrimaryButton children={"ログアウトする"} onClick={()=>handleLogout()}/>
    <p>アカウントを持っていませんか？</p>
    <div className={LoginStyle.linkCenter}><Link to="/" className={LoginStyle.txtOrange}>新規登録</Link></div>
    
    </DefaultLayout>
    </>
  )
}
export default Login;
