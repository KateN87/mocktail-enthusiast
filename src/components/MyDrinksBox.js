import { useContext } from "react";
import { DrinkContext } from "../context/drinkCtxt";

import "./MyDrinksBox.css";

const MyDrinksBox = () => {
	const { drinks, doneDrink, deleteDrink } = useContext(DrinkContext);

	const doneHandler = (drink) => {
		doneDrink(drink);
	};

	const deleteHandler = (drink) => {
		console.log("DRINK", drink);
		deleteDrink(drink);
	};

	return (
		<div>
			<h2>My Drinks</h2>
			{drinks.length === 0 && <p>You don't have any drinks yet!</p>}
			<div className="main-container">
				{drinks.length > 0 &&
					drinks.map((drink) => (
						<div className="my-drink-container" key={drink.idDrink}>
							<h3 className={drink.done ? "line title" : "title"}>
								{drink.strDrink}
							</h3>
							<img
								src={drink.strDrinkThumb}
								alt="mocktail"
								className="small-img"
							/>
							<div className="button-container">
								{!drink.done && (
									<button
										onClick={() => doneHandler(drink)}
										className="small-btn"
									>
										Done?
									</button>
								)}

								<button
									onClick={() => deleteHandler(drink)}
									className="small-btn"
								>
									Delete
								</button>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default MyDrinksBox;
