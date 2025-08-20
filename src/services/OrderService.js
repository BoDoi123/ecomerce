import { axiosJWT } from "./UserService";

export const createOrder = async ({ access_token, data }) => {
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

export const getOrderByUserId = async (id, access_token) => {
	const res = await axiosJWT.get(
		`${import.meta.env.VITE_APP_URL_BACKEND}/order/get-order-details/${id}`,
		{
			headers: {
				token: `Bearer ${access_token}`,
			},
		}
	);

	return res.data;
};
