import PrimaryStyle from "../../styles/button/primaryButton.module.scss"
type ButtonProps= {
    children: string,
    onClick:()=>void
}

const PrimaryButton: React.FC<ButtonProps> = ({ children,onClick }) => {
  return (
    <>
      <button className={PrimaryStyle.primaryButton} onClick={onClick}>{children}</button>
    </>
  );
};

export default PrimaryButton;
