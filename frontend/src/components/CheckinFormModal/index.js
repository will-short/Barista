import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CheckinForm from "./CheckinForm";
import { useDispatch, useSelector } from "react-redux";

export default function CheckinFormModal({
  ownerId,
  drinkImg,
  closeDrink,
  drinkId,
}) {
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
          {
            <CheckinForm
              ownerId={ownerId}
              close={() => setShowModal(false)}
              drinkImg={drinkImg}
              closeDrink={closeDrink}
              drinkId={drinkId}
            />
          }
        </Modal>
      )}
    </>
  );
}
