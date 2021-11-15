import React from "react";
import { useSelector } from "react-redux";
import "./Drink.css";
import CheckinFormModal from "../CheckinFormModal";

export default function Drink({ drinkId, closeDrink }) {
  const drinks = useSelector((state) => state.drinks);
  const currentDrink = drinks.find((drink) => drink.id === drinkId);
  const sessionUser = useSelector((state) => state.session.user);

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
            drinkImg={image}
            closeDrink={closeDrink}
            location={null}
          />
        )}
      </footer>
    </article>
  );
}
