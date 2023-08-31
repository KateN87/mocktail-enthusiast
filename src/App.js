import { useState, useEffect, useRef } from "react";
import "./App.css";
import DrinkBox from "./components/DrinkBox";
import SearchList from "./components/SearchList";

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

	/* 	const containerRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target)
			) {
				setShowList(false);
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []); */

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

	const clickHandler = (drink) => {
		setFoundDrink(drink);
		setSearchVal(drink.strDrink);
		setShowList(false);
	};

	return (
		<div className="App">
			<h1>Kate's To-Drink List</h1>
			<div className="form-container">
				<form onSubmit={handleSubmit}>
					<label htmlFor="search">Search:</label>
					<input
						placeholder="Search a drink..."
						type="text"
						id="search"
						value={searchVal}
						onChange={(e) =>
							setSearchVal(e.target.value.trim().toLowerCase())
						}
						onClick={() => setShowList(true)}
						autoComplete="off"
					/>
					<input type="submit" value="Submit" />
				</form>

				{!error && !foundDrink && !showList && (
					<p>Search for a drink!</p>
				)}
				{error && !foundDrink && <p>{error}</p>}
				{foundDrink && <DrinkBox drink={foundDrink} />}
				{showList && allDrinks.length > 0 && (
					<SearchList
						allDrinks={allDrinks}
						clickHandler={clickHandler}
						input={searchVal}
					/>
				)}
			</div>
		</div>
	);
}

export default App;
