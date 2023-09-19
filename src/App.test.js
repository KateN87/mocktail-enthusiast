import { render, screen, act, waitFor, within } from "@testing-library/react";
import App from "./App";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import { DrinkProvider } from "./context/drinkCtxt";
import FormContainer from "./components/FormContainer";
import MyDrinksBox from "./components/MyDrinksBox";

//Bör ha med ett test med allt som är ett krav i kravspecen
const server = setupServer(
	// Describe the requests to mock.
	rest.get(
		"https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic",
		(_req, res, ctx) => {
			return res(
				ctx.json({
					drinks: [
						{
							idDrink: "12560",
							strDrink: "Afterglow",
							strDrinkThumb:
								"https://www.thecocktaildb.com/images/media/drink/vuquyv1468876052.jpg",
						},
						{
							idDrink: "12782",
							strDrink: "Thai Coffee",
							strDrinkThumb:
								"https://www.thecocktaildb.com/images/media/drink/wquwxs1441247025.jpg",
						},

						{
							idDrink: "12618",
							strDrink: "Orangeade",
							strDrinkThumb:
								"https://www.thecocktaildb.com/images/media/drink/ytsxxw1441167732.jpg",
						},
					],
				})
			);
		}
	)
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("Search drink test", () => {
	it("render page with searchbar", () => {
		render(<FormContainer />);
		expect(
			screen.getByPlaceholderText("Drink name...")
		).toBeInTheDocument();
	});
	//Added a comment
	it("always fails", () => {
		expect(true).toBe(false);
	});

	it("Shows list of drinks when clicked", async () => {
		const user = userEvent.setup();
		render(
			<DrinkProvider>
				{" "}
				<App />
			</DrinkProvider>
		);

		const searchBar = screen.getByPlaceholderText("Drink name...");
		await act(async () => await user.click(searchBar));

		expect(await screen.findAllByRole("listitem")).toHaveLength(3);
	});

	it("Shows clicked drink in searchbar", async () => {
		const user = userEvent.setup();
		render(
			<DrinkProvider>
				{" "}
				<App />
			</DrinkProvider>
		);

		const searchBar = screen.getByPlaceholderText("Drink name...");
		await act(async () => await user.click(searchBar));
		const drinkName = screen.getByText("Afterglow");

		await act(async () => await user.click(drinkName));

		expect(screen.getByDisplayValue("Afterglow")).toBeInTheDocument();
	});

	it("Shows a drink in the drinkbox", async () => {
		const user = userEvent.setup();
		render(
			<DrinkProvider>
				{" "}
				<App />
			</DrinkProvider>
		);

		const searchBar = screen.getByPlaceholderText("Drink name...");
		await act(async () => await user.click(searchBar));
		const drinkName = screen.getByText("Afterglow");

		await act(async () => await user.click(drinkName));

		const submitButton = screen.getByDisplayValue("Submit");
		await act(async () => await user.click(submitButton));

		expect(await screen.findByAltText("mocktail")).toBeInTheDocument();
	});
});

describe("Mt drinks", () => {
	it("My drinks title is shown", () => {
		render(
			<DrinkProvider>
				{" "}
				<App />
			</DrinkProvider>
		);

		const title = screen.getByText("My Drink", { exact: false });
		expect(title).toBeInTheDocument();
	});

	it("shows a drink in my drinks list when clicked", async () => {
		const user = userEvent.setup();
		render(
			<DrinkProvider>
				{" "}
				<App />
			</DrinkProvider>
		);

		const searchBar = screen.getByPlaceholderText("Drink name...");
		await act(async () => await user.click(searchBar));
		const drinkName = screen.getByText("Afterglow");

		await act(async () => await user.click(drinkName));

		const submitButton = screen.getByDisplayValue("Submit");
		await act(async () => await user.click(submitButton));

		const addBtn = screen.getByText("Add", { exact: false });
		await act(async () => await user.click(addBtn));

		const deleteBtn = screen.getByRole("button", { name: "Delete" });

		expect(deleteBtn).toBeInTheDocument();
	});

	it("Removes item when delete-btn is clicked", async () => {
		const user = userEvent.setup();
		render(
			<DrinkProvider>
				{" "}
				<App />
			</DrinkProvider>
		);

		const searchBar = screen.getByPlaceholderText("Drink name...");
		await act(async () => await user.click(searchBar));
		const drinkName = screen.getByText("Afterglow");

		await act(async () => await user.click(drinkName));

		const submitButton = screen.getByDisplayValue("Submit");
		await act(async () => await user.click(submitButton));

		const deleteBtn = screen.queryByText("Delete", { exact: true });
		await act(async () => await user.click(deleteBtn));

		await waitFor(() => expect(deleteBtn).toBeNull());
	});

	it("Crosses the drink over when addBtn is being clicked", async () => {
		const user = userEvent.setup();
		const list = [
			{
				idDrink: "12560",
				strDrink: "Afterglow",
				strDrinkThumb:
					"https://www.thecocktaildb.com/images/media/drink/vuquyv1468876052.jpg",
				done: false,
			},
		];
		render(
			<DrinkProvider>
				{" "}
				<MyDrinksBox drinks={list} />
			</DrinkProvider>
		);

		/* const drinkName = screen.getByText("Afterglow"); */

		const title = screen.getByRole("heading", { level: 3 });
		expect(title).toHaveClass("title");

		/* const addBtn = screen.getByText("Add", { exact: false });
		await act(async () => await user.click(addBtn));

		const doneBtn = screen.getByRole("button", { name: "Done?" });
		await act(async () => await user.click(doneBtn));

		expect(drinkName).toHaveClass("line"); */
		/* await waitFor(() => expect(doneBtn).toBeInTheDocument()); */
	});
});
