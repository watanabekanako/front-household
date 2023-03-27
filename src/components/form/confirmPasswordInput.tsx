import React from "react";
import FormStyle from "../../styles/form/formStyle.module.scss";
import { useDispatch } from "react-redux";
import { addPassword } from "../../features/formSlice";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
const confirmPasswordInput = () => {
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
          placeholder="パスワードを入力してください"
          id="password"
          onChange={(e: any) => dispatch(addPassword(e.target.value))}
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

export default confirmPasswordInput;
