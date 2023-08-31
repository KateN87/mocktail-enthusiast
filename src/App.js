import { useState, useEffect } from "react";
import "./App.css";
import DrinkBox from "./comoponents/DrinkBox";

function App() {
	const [searchVal, setSearchVal] = useState("");
	const [foundDrink, setFoundDrink] = useState();
	const [error, setError] = useState("");
	const [allDrinks, setAllDrinks] = useState([]);
	const [showList, setShowList] = useState(false);

	useEffect(() => {
		const getDrinks = async () => {
			const resp = await fetch(
				"https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
			);

			const data = await resp.json();
			setAllDrinks([...data.drinks]);
		};

		getDrinks();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		const drinkFound = allDrinks.find(
			(drink) => drink.strDrink === searchVal
		);

		if (!drinkFound) {
			setError("Didn't find a drink!");
		} else {
			setFoundDrink(drinkFound);
		}

		setSearchVal("");
	};

	const handleClick = (e, drink) => {
		e.preventDefault();
		setFoundDrink(null);
		setSearchVal(drink.strDrink);
		setShowList(false);
	};

	return (
		<div className="App">
			<h1>Mark's To-Drink List</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="search">Search:</label>
				<input
					placeholder="Search a drink..."
					type="text"
					id="search"
					value={searchVal}
					onChange={(e) => setSearchVal(e.target.value)}
					onClick={() => setShowList(true)}
				/>
				<input type="submit" value="Submit" />
			</form>
			{!error && !foundDrink && <p>Search for a drink!</p>}
			{error && <p>{error}</p>}
			{foundDrink && <DrinkBox drink={foundDrink} />}
			{showList && allDrinks.length > 0 && (
				<ul>
					{allDrinks.map((drink) => (
						<li
							onClick={() => handleClick(drink)}
							key={drink.idDrink}
						>
							{drink.strDrink}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default App;
