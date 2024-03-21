import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.jsx";
import "./main.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
			<Provider store={store}>
				<App />
			</Provider>
		</GoogleOAuthProvider>
	</React.StrictMode>
);
