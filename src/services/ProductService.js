import axios from "axios";

export const getAllProducts = async () => {
	const res = await axios.get(
		`${import.meta.env.VITE_APP_URL_BACKEND}/product/get-all`
	);

	return res.data;
};

export const createProduct = async (data) => {
	const res = await axios.post(
		`${import.meta.env.VITE_APP_URL_BACKEND}/product/create`,
		data
	);

	return res.data;
};
