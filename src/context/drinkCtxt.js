import { createContext, useState } from "react";

export const DrinkContext = createContext();

export function DrinkProvider({ children }) {
	const [drinks, setDrinks] = useState([]);

	const addDrink = (drink) => {
		setDrinks((prev) => [...prev, drink]);
		console.log(drinks);
	};

	const testFunc = () => {
		console.log("Hello");
	};

	const value = {
		addDrink,
		testFunc,
	};

	return (
		<DrinkContext.Provider value={value}>{children}</DrinkContext.Provider>
	);
}
