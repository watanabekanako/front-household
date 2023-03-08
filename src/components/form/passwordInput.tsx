import React from 'react'
import FormStyle from "../../styles/form/formStyle.module.scss"
const PasswordInput = () => {
  return (
  <>
  <div className={FormStyle.inputMain}><input type="password" placeholder='パスワードを入力してください' /></div>
  </>
  )
}

export default PasswordInput;
