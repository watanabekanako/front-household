import React from "react";
import FormStyle from "../../styles/form/formStyle.module.scss";
import { useDispatch } from "react-redux";
import { addPassword } from "../../features/formSlice";
import { useState } from "react";

const PasswordInput = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
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
      </div>
      <button onClick={togglePassword}></button>
      {/* <div>
        <input
          type={passwordShown ? "text" : "password"}
          placeholder="パスワードを入力してください"
        />
      </div> */}
    </>
  );
};

export default PasswordInput;
