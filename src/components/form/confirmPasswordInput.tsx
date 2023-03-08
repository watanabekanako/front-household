import React from 'react'
import FormStyle from "../../styles/form/formStyle.module.scss"
const ConfirmPasswordInput = () => {
  return (
  <>
  <div className={FormStyle.inputMain}><input type="password" placeholder='確認用パスワード' /></div>
  </>
  )
}

export default ConfirmPasswordInput;
