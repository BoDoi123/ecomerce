import {
	WrapperContentProfile,
	WrapperHeader,
	WrapperInput,
	WrapperLabel,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import Loading from "../../components/LoadingComponent/Loading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/userService";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { useMutationHook } from "../../hooks/useMutationHook";

const ProfilePage = () => {
	const user = useSelector((state) => state.user);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [avatar, setAvatar] = useState("");
	const mutation = useMutationHook((data) => {
		const { id, access_token, ...rests } = data;
		UserService.updateUser(id, rests, access_token);
	});
	const dispatch = useDispatch();
	const { data, isPending, isSuccess, isError } = mutation;

	useEffect(() => {
		setEmail(user?.email);
		setName(user?.name);
		setPhone(user?.phone);
		setAddress(user?.address);
		setAvatar(user?.avatar);
	}, [user]);

	useEffect(() => {
		if (isSuccess) {
			message.success();
			handleGetDetailsUser(user?.id, user?.access_token);
		} else if (isError) {
			message.error();
		}
	}, [isSuccess, isError]);

	const handleGetDetailsUser = async (id, token) => {
		const res = await UserService.getDetailsUser(id, token);

		dispatch(updateUser({ ...res?.data, access_token: token }));
	};

	const handleOnChangeEmail = (value) => {
		setEmail(value);
	};

	const handleOnChangeName = (value) => {
		setName(value);
	};

	const handleOnChangePhone = (value) => {
		setPhone(value);
	};

	const handleOnChangeAddress = (value) => {
		setAddress(value);
	};

	const handleOnChangeAvatar = (value) => {
		setAvatar(value);
	};

	const handleUpdate = () => {
		mutation.mutate({
			id: user?.id,
			email,
			name,
			phone,
			address,
			avatar,
			access_token: user?.access_token,
		});
	};

	return (
		<div style={{ width: "1270px", margin: "0 auto", height: "500px" }}>
			<WrapperHeader>Thông tin người dùng</WrapperHeader>

			<Loading isLoading={isPending}>
				<WrapperContentProfile>
					<WrapperInput>
						<WrapperLabel htmlFor="name">Name</WrapperLabel>

						<InputForm
							id="name"
							style={{ width: "300px" }}
							value={name}
							onChange={handleOnChangeName}
						/>

						<ButtonComponent
							onClick={handleUpdate}
							size={40}
							styleButton={{
								color: "rgb(26, 148, 255)",
								fontSize: "1.5rem",
								fontWeight: "700",
								height: "30px",
								width: "fit-content",
								padding: "2px 6px 6px",
							}}
							textButton={"Cập nhật"}
						></ButtonComponent>
					</WrapperInput>

					<WrapperInput>
						<WrapperLabel htmlFor="email">Email</WrapperLabel>

						<InputForm
							id="email"
							style={{ width: "300px" }}
							value={email}
							onChange={handleOnChangeEmail}
						/>

						<ButtonComponent
							onClick={handleUpdate}
							size={40}
							styleButton={{
								color: "rgb(26, 148, 255)",
								fontSize: "1.5rem",
								fontWeight: "700",
								height: "30px",
								width: "fit-content",
								padding: "2px 6px 6px",
							}}
							textButton={"Cập nhật"}
						></ButtonComponent>
					</WrapperInput>

					<WrapperInput>
						<WrapperLabel htmlFor="phone">Phone</WrapperLabel>
						<InputForm
							id="phone"
							style={{ width: "300px" }}
							value={phone}
							onChange={handleOnChangePhone}
						/>

						<ButtonComponent
							onClick={handleUpdate}
							size={40}
							styleButton={{
								color: "rgb(26, 148, 255)",
								fontSize: "1.5rem",
								fontWeight: "700",
								height: "30px",
								width: "fit-content",
								padding: "2px 6px 6px",
							}}
							textButton={"Cập nhật"}
						></ButtonComponent>
					</WrapperInput>

					<WrapperInput>
						<WrapperLabel htmlFor="address">Address</WrapperLabel>
						<InputForm
							id="address"
							style={{ width: "300px" }}
							value={address}
							onChange={handleOnChangeAddress}
						/>

						<ButtonComponent
							onClick={handleUpdate}
							size={40}
							styleButton={{
								color: "rgb(26, 148, 255)",
								fontSize: "1.5rem",
								fontWeight: "700",
								height: "30px",
								width: "fit-content",
								padding: "2px 6px 6px",
							}}
							textButton={"Cập nhật"}
						></ButtonComponent>
					</WrapperInput>

					<WrapperInput>
						<WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
						<InputForm
							id="avatar"
							style={{ width: "300px" }}
							value={avatar}
							onChange={handleOnChangeAvatar}
						/>

						<ButtonComponent
							onClick={handleUpdate}
							size={40}
							styleButton={{
								color: "rgb(26, 148, 255)",
								fontSize: "1.5rem",
								fontWeight: "700",
								height: "30px",
								width: "fit-content",
								padding: "2px 6px 6px",
							}}
							textButton={"Cập nhật"}
						></ButtonComponent>
					</WrapperInput>
				</WrapperContentProfile>
			</Loading>
		</div>
	);
};

export default ProfilePage;
