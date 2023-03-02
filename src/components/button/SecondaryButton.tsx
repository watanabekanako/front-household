import SecondaryStyle from "../../styles/button/secondaryButton.module.scss"
type ButtonProps= {
    children: string,
    onClick:()=>void
}

const SecondaryButton: React.FC<ButtonProps> = ({ children,onClick }) => {
  return (
    <>
      <button className={SecondaryStyle.secondaryButton} onClick={onClick}>{children}</button>
    </>
  );
};

export default SecondaryButton;
