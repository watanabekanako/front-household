import FormStyle from "../../styles/form/formStyle.module.scss"
import { useDispatch } from 'react-redux'
import { addEmail } from '../../features/Form'


const EmailInput=()=> {
  const dispatch =useDispatch();
  return (
  <>
  <div className={FormStyle.inputMain}><input type="email" id="email" placeholder='メールアドレス入力してください' onChange={
(e:any)=>dispatch(addEmail(e.target.value))  
  } /></div>
  </>
  )
}

export default EmailInput;
