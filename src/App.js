import { useState, useEffect, useRef, useContext } from "react";
import "./App.css";
import DrinkBox from "./components/DrinkBox";
import SearchList from "./components/SearchList";
import FormContainer from "./components/FormContainer";
import MyDrinksBox from "./components/MyDrinksBox";
import { DrinkContext } from "./context/drinkCtxt";

function App() {
	const { addDrink, drinks } = useContext(DrinkContext);
	const [searchVal, setSearchVal] = useState("");
	const [foundDrink, setFoundDrink] = useState();
	const [error, setError] = useState("");
	const [allDrinks, setAllDrinks] = useState([]);
	const [showList, setShowList] = useState(false);

	const searchListRef = useRef(null);

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

	useEffect(() => {
		// Add a click event listener to the document
		const handleClickOutside = (e) => {
			if (
				searchListRef.current &&
				!searchListRef.current.contains(e.target)
			) {
				// Click occurred outside the SearchList component
				setShowList(false);
			}
		};

		// Attach the event listener when showList is true
		let timeoutId;
		if (showList) {
			timeoutId = setTimeout(() => {
				document.addEventListener("click", handleClickOutside);
			}, 0);
		}

		// Remove the event listener when component unmounts or showList becomes false
		return () => {
			clearTimeout(timeoutId);
			document.removeEventListener("click", handleClickOutside);
		};
	}, [showList]);

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

	const chooseHandler = (drink) => {
		setFoundDrink(drink);
		setSearchVal(drink.strDrink);
		setShowList(false);
	};

	return (
		<div className="App">
			<h1>Kate's To-Drink List</h1>
			<div className="form-container">
				<FormContainer
					handleSubmit={handleSubmit}
					searchVal={searchVal}
					setSearchVal={setSearchVal}
					setShowList={setShowList}
				/>
				{showList && allDrinks.length > 0 && (
					<div ref={searchListRef}>
						<SearchList
							allDrinks={allDrinks}
							clickHandler={chooseHandler}
							input={searchVal}
						/>
					</div>
				)}
			</div>
			{error && !foundDrink && <p>{error}</p>}
			{foundDrink && (
				<DrinkBox
					drink={foundDrink}
					clickHandler={() => addDrink(foundDrink)}
					buttonText="Add"
				/>
			)}
			<MyDrinksBox drinks={drinks} />
		</div>
	);
}

export default App;
