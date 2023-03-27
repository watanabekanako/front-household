import { toast } from "react-toastify";

const toastItem = () => {
  const successMsg = (msg: string) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return { successMsg };
};

export default toastItem;
