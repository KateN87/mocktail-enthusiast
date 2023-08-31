import React from "react";

import "./SearchList.css";

const SearchList = ({ allDrinks, clickHandler, input }) => {
	const filteredDrinks = allDrinks.filter((drink) => {
		// If no input, include all drinks
		if (input === "") {
			return true; // Include the drink in the filtered result
		} else {
			return drink.strDrink.toLowerCase().includes(input);
		}
	});

	return (
		<div className="list-container">
			<ul>
				{filteredDrinks.length === 0 && <p>Couldn't find any drinks</p>}
				{filteredDrinks.map((drink) => (
					<li onClick={() => clickHandler(drink)} key={drink.idDrink}>
						{drink.strDrink}
					</li>
				))}
			</ul>
		</div>
	);
};

export default SearchList;
