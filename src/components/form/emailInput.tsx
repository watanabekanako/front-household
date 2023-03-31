import FormStyle from "../../styles/form/formStyle.module.scss";
import { useDispatch } from "react-redux";
import { addEmail } from "../../features/formSlice";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { EmailInputProps } from "../../types/Types";

const EmailInput = (props: EmailInputProps) => {
  const { userEmail } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const currentLocation = location.pathname;
  const [initialEmail, setInitialEmail] = useState(
    currentLocation.startsWith("/account") ? userEmail : ""
  );

  useEffect(() => {
    setInitialEmail(currentLocation.startsWith("/account") ? userEmail : "");
  }, [currentLocation, userEmail]);

  useEffect(() => {
    if (initialEmail === userEmail) {
      dispatch(addEmail(userEmail));
    } else {
      dispatch(addEmail(initialEmail));
    }
  }, [initialEmail]);

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setInitialEmail(e.target.value);
    dispatch(addEmail(e.target.value));
  };

  return (
    <>
      <div className={FormStyle.inputMain}>
        <input
          type="email"
          id="email"
          value={initialEmail || ""} // 初期値がundefinedの場合に空の文字列を設定する
          placeholder="メールアドレス入力してください"
          onChange={changeEmail}
        />
      </div>
    </>
  );
};

export default EmailInput;
