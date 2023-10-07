import Modal from "react-modal";
import { useState } from "react";
import { AiFillCloseCircle as CloseIcon } from "react-icons/ai";
//import "../w3.css"
const DescriptionModal = ({ description }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button onClick={openModal} id="task-action-btn">
        View
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="My Modal"
        appElement={document.getElementById("root")} // Set the app element here
      >
        <button onClick={closeModal} id="close-modal-btn">
          <CloseIcon />
        </button>
        <div className="description-con">
            <h1>Description :</h1>
            <hr />
           <div className="overflow">
           <p>{description}</p>
           </div>
        </div>
      </Modal>
    </>
  );
};

export default DescriptionModal;
