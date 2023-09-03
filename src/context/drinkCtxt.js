import { createContext, useState } from "react";

export const DrinkContext = createContext();

export function DrinkProvider({ children }) {
	const [drinks, setDrinks] = useState([]);

	const addDrink = (drink) => {
		setDrinks((prev) => [...prev, { ...drink, done: false }]);
		console.log("ADDED", drinks);
	};

	const doneDrink = (pickedDrink) => {
		const updatedDrinksArray = drinks.map((drink) => {
			if (drink.idDrink === pickedDrink.idDrink) {
				return { ...drink, done: true };
			} else {
				return drink;
			}
		});
		setDrinks(updatedDrinksArray);
	};

	const deleteDrink = (pickedDrink) => {
		const updatedDrinksArray = drinks.filter(
			(drink) => drink.idDrink !== pickedDrink.idDrink
		);
		console.log(updatedDrinksArray);
		setDrinks(updatedDrinksArray);
	};

	const deleteAll = () => {
		setDrinks([]);
	};

	const value = {
		addDrink,
		doneDrink,
		deleteDrink,
		deleteAll,
		drinks,
	};

	return (
		<DrinkContext.Provider value={value}>{children}</DrinkContext.Provider>
	);
}
