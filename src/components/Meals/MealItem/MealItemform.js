import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const [isAmountValid, setIsAmountValid] = useState(true);
  const amountRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    if (enteredAmount.trim().length === 0 || enteredAmount < 1) {
      setIsAmountValid(false);
      return;
    }
    setIsAmountValid(true);
    props.onAddToCart(Number(enteredAmount));
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          steps: "1",
          defaultValue: "1",
        }}
        label="Food"
      />
      <button type="submit">+ Add</button>
      {!isAmountValid && <p>Enter valid amount!!</p>}
    </form>
  );
};
export default MealItemForm;
