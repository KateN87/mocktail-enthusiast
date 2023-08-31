import { useContext } from "react";
import "./DrinkBox.css";
import { DrinkContext } from "../context/drinkCtxt";

const DrinkBox = ({ drink }) => {
	const { addDrink } = useContext(DrinkContext);

	const handleAdd = () => {
		addDrink(drink);
	};

	return (
		<div>
			<h1>{drink.strDrink}</h1>
			<img src={drink.strDrinkThumb} alt="mocktail" />
			<button onClick={handleAdd}>Add</button>
		</div>
	);
};

export default DrinkBox;
