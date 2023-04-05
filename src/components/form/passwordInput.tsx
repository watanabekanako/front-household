import React, { ChangeEvent, forwardRef, useImperativeHandle } from "react";
import FormStyle from "../../styles/form/formStyle.module.scss";
import { useDispatch } from "react-redux";
import { addPassword } from "../../features/formSlice";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";

const PasswordInput = forwardRef((props, ref) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    dispatch(addPassword(e.target.value));
  };

  useImperativeHandle(ref, () => ({
    clearPass: () => {
      setPassword("");
      dispatch(addPassword(""));
    },
  }));
  return (
    <>
      <div className={FormStyle.inputMain}>
        <input
          type={passwordShown ? "text" : "password"}
          placeholder="パスワードを8文字以上10文字以内で入力してください"
          id="password"
          value={password}
          onChange={handlePassword}
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

      {/* <div>
        <input
          type={passwordShown ? "text" : "password"}
          placeholder="パスワードを入力してください"
        />
      </div> */}
    </>
  );
});

export default PasswordInput;
