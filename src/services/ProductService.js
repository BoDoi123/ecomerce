import axios from "axios";

export const getAllProducts = async () => {
	const res = await axios.get(
		`${import.meta.env.VITE_APP_URL_BACKEND}/product/get-all`
	);

	return res.data;
};
