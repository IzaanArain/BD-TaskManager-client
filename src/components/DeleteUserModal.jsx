import Modal from "react-modal"
import { useState } from "react";
import { AiFillCloseCircle as CloseIcon } from "react-icons/ai";
import DeleteButton from "./DeleteButton";
const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
      position: 'absolute',
      top: '300px',
      left: '400px',
      right: '400px',
      bottom: '300px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px'
    }
  };

const DeleteUserModal = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
  return (
    <>
     <button onClick={openModal} id="delete_btn">
        Delete
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="My Modal"
        style={customStyles}
        appElement={document.getElementById("root")} // Set the app element here
      >
        <button onClick={closeModal} id="close-modal-btn">
          <CloseIcon />
        </button>
        <div className="delete-task-modal">
        <h1>Are you sure you want to delete this user</h1>
        <div className="btn-modal-con">
          {/* <button className="modal-btn">Delete</button> */}
          <DeleteButton/>
          <button onClick={closeModal} className="modal-btn">Cancel</button>
        </div>
        </div>
        </Modal>
    </>
  )
}

export default DeleteUserModal