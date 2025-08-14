import { Fragment, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { routes } from "./routes";
import { useQuery } from "@tanstack/react-query";

function App() {
	// useEffect(() => {
	// 	fetchApi();
	// }, []);

	const fetchApi = async () => {
		const res = await axios.get(
			`${import.meta.env.VITE_API_URL_BACKEND}/product/get-all`
		);

		return res.data;
	};

	const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });
	console.log("query", query);

	return (
		<div>
			<Router>
				<Routes>
					{routes.map((route) => {
						const Page = route.page;
						const Layout = route.isShowHeader
							? DefaultComponent
							: Fragment;

						return (
							<Route
								key={route.path}
								path={route.path}
								element={
									<Layout>
										<Page />
									</Layout>
								}
							></Route>
						);
					})}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
