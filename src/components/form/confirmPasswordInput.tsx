import React from "react";
import FormStyle from "../../styles/form/formStyle.module.scss";
import { useDispatch } from "react-redux";
import { addConfirmPassword } from "../../features/formSlice";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
const ConfirmPasswordInput = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  };
  return (
    <>
      <div className={FormStyle.inputMain}>
        <input
          type={passwordShown ? "text" : "password"}
          placeholder="確認用パスワードを入力してください"
          id="confirmPassword"
          onChange={(e: any) => dispatch(addConfirmPassword(e.target.value))}
        />
        <span
          onClick={togglePassword}
          role="presentation"
          className={FormStyle.PasswordReveal}
        >
          {isRevealPassword ? (
            <AddBoxIcon />
          ) : (
            <i className="fas fa-eye-slash" />
          )}
        </span>
      </div>
    </>
  );
};

export default ConfirmPasswordInput;
