import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import Drink from "./Drink";

export default function DrinkModal({ image, name, drinkId }) {
  const [showModal, setShowModal] = useState(false);
  const searchDiv = document.querySelector(".search");
  const background = {
    "background-image": `url('${image}')`,
    "background-size": "cover",
    "background-repeat": "no-repeat",
    "background-position": "center",
  };
  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="drink-button"
        style={background}
      >
        <div>{name}</div>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {<Drink drinkId={drinkId} closeDrink={() => setShowModal(false)} />}
        </Modal>
      )}
    </>
  );
}
