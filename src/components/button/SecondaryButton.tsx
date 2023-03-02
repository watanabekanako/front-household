import SecondaryStyle from "../../styles/button/secondaryButton.module.scss"
import { ComponentProps } from "react";

const SecondaryButton:  React.FC<ComponentProps<"button">> = ({ children,...props }) => {
  return (
    <>
      <button className={SecondaryStyle.secondaryButton} {...props}>{children}</button>
    </>
  );
};

export default SecondaryButton;
