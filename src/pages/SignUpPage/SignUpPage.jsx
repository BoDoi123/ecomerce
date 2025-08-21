import {
	WrapperContainerLeft,
	WrapperContainerRight,
	WrapperTextLight,
} from "./style";
import { EyeInvisibleFilled, EyeFilled } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import imageLogo from "../../assets/imgs/logo-login.png";
import { Image } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";

const SignUpPage = () => {
	const navigate = useNavigate();
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const mutation = useMutationHook((data) => UserService.signUpUser(data));
	const { data, isPending } = mutation;

	useEffect(() => {
		if (data?.status === "OK") {
			message.success("Đăng ký thành công");

			handleNavigateSignIn();
		} else if (data?.status === "ERR") {
			message.error();
		}
	}, [isPending]);

	const handleNavigateSignIn = () => {
		navigate("/sign-in");
	};

	const handleOnChangeEmail = (value) => {
		setEmail(value);
	};

	const handleOnChangePassword = (value) => {
		setPassword(value);
	};

	const handleOnChangeConfirmPassword = (value) => {
		setConfirmPassword(value);
	};

	const handleSignUp = () => {
		mutation.mutate({
			email,
			password,
			confirmPassword,
		});
	};

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "rgb(0, 0, 0, 0.53)",
				height: "100vh",
			}}
		>
			<div
				style={{
					width: "800px",
					height: "445px",
					borderRadius: "6px",
					backgroundColor: "#fff",
					display: "flex",
				}}
			>
				<WrapperContainerLeft>
					<h1 style={{ marginBottom: "8px" }}>Xin chào</h1>
					<p
						style={{
							fontSize: "1.6rem",
							marginTop: "0",
							marginBottom: "20px",
						}}
					>
						Đăng nhập và tạo tài khoản
					</p>
					<InputForm
						style={{ marginBottom: "10px" }}
						placeholder="abc@gmail.com"
						value={email}
						onChange={handleOnChangeEmail}
					/>

					<div style={{ position: "relative" }}>
						<span
							onClick={() => setIsShowPassword(!isShowPassword)}
							style={{
								zIndex: 10,
								position: "absolute",
								top: "4px",
								right: "8px",
							}}
						>
							{isShowPassword ? (
								<EyeFilled />
							) : (
								<EyeInvisibleFilled />
							)}
						</span>

						<InputForm
							style={{ marginBottom: "10px" }}
							placeholder="password"
							type={isShowPassword ? "text" : "password"}
							value={password}
							onChange={handleOnChangePassword}
						/>
					</div>

					<div style={{ position: "relative" }}>
						<span
							onClick={() =>
								setIsShowConfirmPassword(!isShowConfirmPassword)
							}
							style={{
								zIndex: 10,
								position: "absolute",
								top: "4px",
								right: "8px",
							}}
						>
							{isShowConfirmPassword ? (
								<EyeFilled />
							) : (
								<EyeInvisibleFilled />
							)}
						</span>

						<InputForm
							placeholder="confirm password"
							type={isShowConfirmPassword ? "text" : "password"}
							value={confirmPassword}
							onChange={handleOnChangeConfirmPassword}
						/>
					</div>
					{data?.status === "ERR" && (
						<span style={{ color: "red" }}>{data?.message}</span>
					)}

					<Loading isLoading={isPending}>
						<ButtonComponent
							disabled={
								!email.length ||
								!password.length ||
								!confirmPassword.length
							}
							onClick={handleSignUp}
							size={40}
							styleButton={{
								background: "rgb(255, 57, 69)",
								color: "#fff",
								fontSize: "1.5rem",
								fontWeight: "700",
								height: "48px",
								width: "100%",
								border: "none",
								margin: "26px 0 10px",
							}}
							textButton={"Đăng ký"}
						></ButtonComponent>
					</Loading>

					<p style={{ marginTop: "0" }}>
						Bạn đã có tài khoản?{" "}
						<WrapperTextLight onClick={handleNavigateSignIn}>
							Đăng nhập
						</WrapperTextLight>
					</p>
				</WrapperContainerLeft>

				<WrapperContainerRight>
					<Image
						src={imageLogo}
						preview={false}
						alt="image-logo"
						height="203px"
						width="203px"
					/>
					<h4>Mua sắm tại LTTD</h4>
				</WrapperContainerRight>
			</div>
		</div>
	);
};

export default SignUpPage;
