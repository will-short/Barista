import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CheckinForm from "./CheckinForm";
import { useDispatch, useSelector } from "react-redux";

export default function CheckinFormModal({ drinkId, ownerId }) {
  const [showModal, setShowModal] = useState(false);
  const searchDiv = document.querySelector(".search");

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
          searchDiv.lastChild.style.display = "none";
        }}
      >
        Checkin
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {<CheckinForm drinkId={drinkId} ownerId={ownerId} />}
        </Modal>
      )}
    </>
  );
}
