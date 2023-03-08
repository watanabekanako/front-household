import React from 'react'
import FormStyle from "../../styles/form/formStyle.module.scss"
const EmailInput = () => {
  return (
  <>
  <div className={FormStyle.inputMain}><input type="email" placeholder='メールアドレス入力してください' /></div>
  </>
  )
}

export default EmailInput;
