import React from 'react'
import { Outlet } from 'react-router-dom'
import PrimaryButton from '../button/PrimaryButton'
import SecondaryButton from '../button/SecondaryButton'
// import '../../App.css'
const AuthLayout = () => {
    console.log(PrimaryButton)
  return (
    <>
    <div className='App'>AuthLayout</div>
    <PrimaryButton children={"登録する"} onClick={()=>alert("登録できました")}/>
　　<SecondaryButton children={"削除する"} onClick={()=>alert("登録できました")}/>
    <Outlet/>
    </>
  )
}

export default AuthLayout
