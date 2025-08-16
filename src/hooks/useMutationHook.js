import { useMutation } from "@tanstack/react-query";

export const useMutationHook = (fnCallback) => {
	const mutation = useMutation({
		mutationFn: fnCallback,
		onSuccess: () => {
			// Tự động reset sau khi thành công
			setTimeout(() => {
				mutation.reset();
			}, 500);
		},
		onError: () => {
			// Tự động reset sau khi có lỗi
			setTimeout(() => {
				mutation.reset();
			}, 500);
		},
	});

	return mutation;
};
