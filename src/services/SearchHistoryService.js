import axios from "axios";

export const createSearchHistory = async (id, searchTerm, access_token) => {
	try {
		await axios.post(
			"/api/history/add",
			{
				userId: id,
				searchTerm,
			},
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		);
	} catch (e) {
		console.log(e);
	}
};

export const getSearchHistory = async (id, access_token) => {
	try {
		const response = await axios.get(`/api/history/user/${id}`, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error fetching search history:", error);
	}
};
