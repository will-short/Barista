import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Drink.css";
import CheckinFormModal from "../CheckinFormModal";

export default function Drink({ drinkId }) {
  const drinks = useSelector((state) => state.drinks.drinks);
  const currentDrink = drinks.find((drink) => drink.id === drinkId);
  const sessionUser = useSelector((state) => state.session.user);

  console.log(currentDrink);
  let { name, description, image, ingredients } = currentDrink;
  return (
    <article>
      <header>
        <img src={image} alt="" />
        <div>
          <h2>{name}</h2>
          <h3>
            Ingredients: <div>{ingredients}</div>
          </h3>
        </div>
      </header>
      <section>
        <div>
          <h3>Description:</h3>
          <p>{description}</p>
        </div>
      </section>
      <footer>
        {sessionUser && (
          <CheckinFormModal
            drinkId={drinkId}
            ownerId={sessionUser?.id}
            drinkImg={image}
          />
        )}
      </footer>
    </article>
  );
}