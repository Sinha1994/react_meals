import { Fragment } from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./Meals.Summary";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
