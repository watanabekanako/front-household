import React from 'react'
import DefaultLayout from '../components/layout/dafaultLayout'
import PrimaryButton from '../components/button/PrimaryButton'
const Login = () => {
  return (
  <>
   <DefaultLayout>
    <PrimaryButton children={"ログインする"} onClick={()=>alert("登録できました")}/>
    </DefaultLayout></>
  )
}

export default Login
