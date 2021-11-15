import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CheckinForm from "./CheckinForm";

export default function CheckinFormModal({
  drinkImg,
  closeDrink,
  drinkId,
  location,
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
              close={() => setShowModal(false)}
              drinkImg={drinkImg}
              closeDrink={closeDrink}
              drinkId={drinkId}
              location={location}
            />
          }
        </Modal>
      )}
    </>
  );
}
