import React, { useState } from 'react'
import FormStyle from "../../styles/form/formStyle.module.scss"

// type Props={
//   inputElementProps?:React.ComponentProps<'input'>;
// }

const EmailInput:React.FC<{inputEmail?:(email:string)=>void}>=({inputEmail})=> {
  const [email,setEmail]=useState("")
 console.log("children",email)

const handleChange =(e:any)=>{
setEmail(e.target.value);

}

  return (
  <>
  <div className={FormStyle.inputMain}><input type="email" placeholder='メールアドレス入力してください' value={email} onChange={handleChange} /></div>
  </>
  )
}

export default EmailInput;
