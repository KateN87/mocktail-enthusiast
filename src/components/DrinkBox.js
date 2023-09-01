import "./DrinkBox.css";

const DrinkBox = ({ drink, clickHandler, buttonText }) => {
	return (
		<div className="drink-container">
			<h3>{drink.strDrink}</h3>
			<img src={drink.strDrinkThumb} alt="mocktail" />
			<div className="button-container">
				<button onClick={clickHandler}>{buttonText}</button>
			</div>
		</div>
	);
};

export default DrinkBox;
