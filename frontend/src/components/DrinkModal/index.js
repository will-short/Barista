import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import Drink from "./Drink";

export default function DrinkModal({ image, name, drinkId }) {
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
        <img src={image} alt="" />
        <div>{name}</div>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {<Drink drinkId={drinkId} />}
        </Modal>
      )}
    </>
  );
}