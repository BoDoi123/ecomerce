import { axiosJWT } from "./UserService";

export const createOrder = async ({ access_token, data }) => {
	console.log(data);
	const res = await axiosJWT.post(
		`${import.meta.env.VITE_APP_URL_BACKEND}/order/create`,
		data,
		{
			headers: {
				token: `Bearer ${access_token}`,
			},
		}
	);

	return res.data;
};
