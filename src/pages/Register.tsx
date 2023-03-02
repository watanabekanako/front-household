import React from 'react'
import DefaultLayout from '../components/layout/dafaultLayout'
import PrimaryButton from '../components/button/PrimaryButton'
const Register = () => {
  return (
   <>
    <DefaultLayout>
    <PrimaryButton children={"登録"} onClick={()=>alert("登録できました")}/>
    </DefaultLayout></>
  )
}

export default Register
