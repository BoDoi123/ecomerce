import axios from "axios";
axios.defaults.withCredentials = true;

export const axiosJWT = axios.create();

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

export const getDetailsUser = async (id, access_token) => {
	const res = await axiosJWT.get(
		`${import.meta.env.VITE_APP_URL_BACKEND}/user/get-details/${id}`,
		{
			headers: {
				token: `Bearer ${access_token}`,
			},
		}
	);

	return res.data;
};

export const refreshToken = async () => {
	const res = await axios.post(
		`${import.meta.env.VITE_APP_URL_BACKEND}/user/refresh-token`,
		{
			withCredentials: true,
		}
	);

	return res.data;
};

export const logoutUser = async () => {
	const res = await axios.post(
		`${import.meta.env.VITE_APP_URL_BACKEND}/user/log-out`
	);

	return res.data;
};
