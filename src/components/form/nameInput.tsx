import React, { ChangeEvent, forwardRef, useImperativeHandle } from "react";
import FormStyle from "../../styles/form/formStyle.module.scss";
import { useDispatch } from "react-redux";
import { addName } from "../../features/formSlice";
import { useState } from "react";
import { text } from "stream/consumers";

const NameInput = forwardRef((props, ref) => {
  const [name, setName] = useState<string>();
  const dispatch = useDispatch();

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    dispatch(addName(e.target.value));
  };

  useImperativeHandle(ref, () => ({
    clearPass: () => {
      setName("");
      dispatch(addName(""));
    },
  }));
  return (
    <>
      <div className={FormStyle.inputMain}>
        <input
          type="text"
          placeholder="お名前を入力してください"
          id="name"
          value={name}
          onChange={handlePassword}
        />
      </div>
    </>
  );
});

export default NameInput;
