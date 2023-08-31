import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DrinkProvider } from "./context/drinkCtxt";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<DrinkProvider>
			<App />
		</DrinkProvider>
	</React.StrictMode>
);
