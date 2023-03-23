import React from "react";
import { Container } from "@mui/material";
import Modal from "react-modal";
import ConfirmModalStyle from "../../styles/modal/confirmModal.module.scss";

const ConfirmModal = (props: any) => {
  const { editModalIsOpen, setEditModalIsOpen, onClick, isAdmin } = props;
  const customStyles = {
    content: {
      top: "20%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      minWidth: "40%",
    },
  };

  Modal.setAppElement("#root");

  const cancel = () => {
    setEditModalIsOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Modal isOpen={editModalIsOpen} style={customStyles}>
        {!isAdmin ? (
          <div className={ConfirmModalStyle.modalContainer}>
            <p>本当に削除しますか</p>
            <ul>
              <li>
                <button onClick={onClick}>はい</button>
              </li>
              <li>
                <button onClick={cancel}>いいえ</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className={ConfirmModalStyle.modalContainer}>
            <p>ログアウトしますか</p>
            <ul>
              <li>
                <button onClick={onClick}>はい</button>
              </li>
              <li>
                <button onClick={cancel}>いいえ</button>
              </li>
            </ul>
          </div>
        )}
      </Modal>
    </Container>
  );
};

export default ConfirmModal;
