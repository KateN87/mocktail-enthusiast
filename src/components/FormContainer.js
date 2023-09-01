import "./FormContainer.css";

const FormContainer = ({
	handleSubmit,
	searchVal,
	setSearchVal,
	setShowList,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="search">Search for a drink!</label>
			<input
				placeholder="Drink name..."
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
	);
};

export default FormContainer;
