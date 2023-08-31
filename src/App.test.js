import { render, screen, act } from "@testing-library/react";
import App from "./App";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import { DrinkProvider } from "./context/drinkCtxt";

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

it("render page with searchbar", () => {
	render(<App />);
	expect(
		screen.getByPlaceholderText("Search a drink...")
	).toBeInTheDocument();
});

it("Shows list of drinks when clicked", async () => {
	const user = userEvent.setup();

	render(<App />);

	const searchBar = screen.getByPlaceholderText("Search a drink...");
	await act(async () => await user.click(searchBar));

	expect(await screen.findAllByRole("listitem")).toHaveLength(3);
});

it("Shows clicked drink in searchbar", async () => {
	const user = userEvent.setup();
	render(<App />);

	const searchBar = screen.getByPlaceholderText("Search a drink...");
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

	const searchBar = screen.getByPlaceholderText("Search a drink...");
	await act(async () => await user.click(searchBar));
	const drinkName = screen.getByText("Afterglow");

	await act(async () => await user.click(drinkName));

	const submitButton = screen.getByDisplayValue("Submit");
	await act(async () => await user.click(submitButton));

	expect(await screen.findByAltText("mocktail")).toBeInTheDocument();
});
