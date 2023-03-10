import DefaultLayout from '../components/layout/dafaultLayout'
import PrimaryButton from '../components/button/PrimaryButton'
import RegisterStyle from '../styles/pages/register.module.scss'
import PasswordInput from '../components/form/passwordInput'
import EmailInput from '../components/form/emailInput'
import ConfirmPasswordInput from '../components/form/confirmPasswordInput'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const Register = () => {
  const formEmail=useSelector((state:any)=>state.posts.email);
  const formPassword=useSelector((state:any)=>state.posts.email);
  console.log("formEmail",formEmail)
  console.log("formPassword",formPassword)
  const dispatch= useDispatch();

 
const handleClick=()=>{
  axios.post("/auth/signup",{
    email:formEmail,
    password:formPassword
  })
  // http://localhost:3005/auth/signup
  alert("完了")
}

  return (
   <>
    <DefaultLayout>
      <EmailInput />
      <PasswordInput/>
      <ConfirmPasswordInput/>
    <PrimaryButton children={"登録"} onClick={()=>handleClick()}/>
    <p>アカウントをお持ちですか？</p>
    <div className={RegisterStyle.linkCenter}><Link to="/login" className={RegisterStyle.txtOrange}>ログインする</Link>
    </div>
    </DefaultLayout></>
  )
}
export default Register;
