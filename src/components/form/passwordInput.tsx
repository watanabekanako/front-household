import React from 'react'
import FormStyle from "../../styles/form/formStyle.module.scss"
import { useDispatch } from 'react-redux'
import { addPassword } from '../../features/Form'
const PasswordInput = () => {
  const dispatch =useDispatch();
  return (
  <>

  <div className={FormStyle.inputMain}><input type="password" placeholder='パスワードを入力してください' id="password" onChange={
(e:any)=>dispatch(addPassword(e.target.value))  
  }/></div>
  </>
  )
}

export default PasswordInput;
