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

const SignInPage = () => {
	const [isShowPassword, setIsShowPassword] = useState(false);

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
					/>

					<div style={{ position: "relative" }}>
						<span
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
						/>
					</div>

					<ButtonComponent
						size={40}
						style={{
							backgroundColor: "rgb(255, 57, 69)",
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

					<p style={{ marginBottom: "-6px", marginTop: "0" }}>
						<WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
					</p>
					<p>
						Chưa có tài khoản?{" "}
						<WrapperTextLight>Tạo tài khoản</WrapperTextLight>
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
