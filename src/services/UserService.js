import axios from "axios";

export const loginUser = async (data) => {
	const res = await axios.post(
		`${import.meta.env.VITE_APP_URL_BACKEND}/user/sign-in`,
		data
	);

	return res.data;
};

export const signUpUser = async (data) => {
	const res = await axios.post(
		`${import.meta.env.VITE_APP_URL_BACKEND}/user/sign-up`,
		data
	);

	return res.data;
};
