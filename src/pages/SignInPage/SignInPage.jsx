import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {
	WrapperContainerLeft,
	WrapperContainerRight,
	WrapperTextLight,
} from "./style";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Image } from "antd";
import imageLogo from "../../assets/imgs/logo-login.png";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";

const SignInPage = () => {
	const navigate = useNavigate();
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const mutation = useMutationHook((data) => UserService.loginUser(data));
	const { data, isPending } = mutation;

	const handleNavigateSignUp = () => {
		navigate("/sign-up");
	};

	const handleOnChangeEmail = (value) => {
		setEmail(value);
	};

	const handleOnChangePassword = (value) => {
		setPassword(value);
	};

	const handleSignIn = () => {
		mutation.mutate({
			email,
			password,
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
							placeholder="password"
							type={isShowPassword ? "text" : "password"}
							value={password}
							onChange={handleOnChangePassword}
						/>
					</div>
					{data?.status === "ERR" && (
						<span style={{ color: "red" }}>{data?.message}</span>
					)}

					<Loading isLoading={isPending}>
						<ButtonComponent
							disabled={!email.length || !password.length}
							onClick={handleSignIn}
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
							textButton={"Đăng nhập"}
						></ButtonComponent>
					</Loading>

					<p style={{ marginBottom: "-6px", marginTop: "0" }}>
						<WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
					</p>
					<p>
						Chưa có tài khoản?{" "}
						<WrapperTextLight onClick={handleNavigateSignUp}>
							Tạo tài khoản
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

export default SignInPage;
