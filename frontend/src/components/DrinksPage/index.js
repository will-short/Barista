import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckinFeed from "../CheckinFeed";
import { getAllLocations } from "../../store/locations";
import logo from "../../images/logo-text-nobg.png";
import { Route, Switch, NavLink } from "react-router-dom";
import Locations from "../Locations";
import ProfilePage from "../ProfilePage";
import DrinkModal from "../DrinkModal";
import "./DrinksPage.css";

export default function DrinksPage() {
  const drinks = useSelector((state) => state.drinks);

  return (
    <div className="drinks-container">
      {drinks.map(({ name, image, id }) => {
        return <DrinkModal key={id} name={name} image={image} drinkId={id} />;
      })}
    </div>
  );
}
