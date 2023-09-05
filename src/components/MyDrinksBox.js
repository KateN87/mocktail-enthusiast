import { useContext, useState } from "react";
import { DrinkContext } from "../context/drinkCtxt";

import "./MyDrinksBox.css";

const MyDrinksBox = ({ drinks }) => {
	const { doneDrink, deleteDrink, deleteAll } = useContext(DrinkContext);
	const [filter, setFilter] = useState("All");

	const filteredDrinks = drinks?.filter((drink) => {
		switch (filter) {
			case "all":
				return true;
			case "completed":
				if (drink.done) {
					return true;
				} else {
					return false;
				}
			default:
				return true;
		}
	});

	return (
		<div>
			<h2>My Drinks</h2>
			<div className="filter-container">
				<p>Filter by: </p>
				<button
					onClick={() => setFilter("all")}
					className={filter === "all" ? "active" : ""}
				>
					All
				</button>
				<button
					onClick={() => setFilter("completed")}
					className={filter === "completed" ? "active" : ""}
				>
					Completed
				</button>
			</div>
			{filteredDrinks.length === 0 && (
				<p>You don't have any drinks yet!</p>
			)}
			<div className="main-container">
				{filteredDrinks &&
					filteredDrinks.length > 0 &&
					filteredDrinks.map((drink) => (
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
										onClick={() => doneDrink(drink)}
										className="small-btn"
									>
										Done?
									</button>
								)}

								<button
									onClick={() => deleteDrink(drink)}
									className="small-btn"
								>
									Delete
								</button>
							</div>
						</div>
					))}
			</div>
			<button onClick={() => deleteAll()}>Clear</button>
		</div>
	);
};

export default MyDrinksBox;
