import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import Drink from "./Drink";

function DrinkModal({ image, name }) {
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
        <Modal onClose={() => setShowModal(false)}>{/* <Drink /> */}</Modal>
      )}
    </>
  );
}

export default DrinkModal;
