import { ComponentProps } from "react";
import PrimaryStyle from "../../styles/button/primaryButton.module.scss"


const PrimaryButton: React.FC<ComponentProps<"button">>  = ({ children,...props }) => {
  console.log(props)
  return (
    <>
    <div className="Container">
      <button className={PrimaryStyle.primaryButton} {...props}>{children}</button>
      </div>
    </>
  );
};

export default PrimaryButton;
