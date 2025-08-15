import { Badge, Col } from "antd";
import {
	UserOutlined,
	CaretDownOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";
import {
	WrapperHeader,
	WrapperTextHeader,
	WrapperHeaderAccount,
	WrapperTextHeaderCart,
} from "./style";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router";

const HeaderComponent = () => {
	const navigate = useNavigate();
	const handleNavigateLogin = () => {
		navigate("./sign-in");
	};

	return (
		<div
			style={{
				width: "100%",
				background: "rgb(26, 148, 255)",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<WrapperHeader>
				<Col span={5}>
					<WrapperTextHeader>LAPTRINHTHATDE</WrapperTextHeader>
				</Col>
				<Col span={13}>
					<ButtonInputSearch
						size="large"
						placeholder="input search text"
						textButton="Tìm kiếm"
					/>
				</Col>
				<Col
					span={6}
					style={{
						display: "flex",
						gap: "54px",
						alignItems: "center",
					}}
				>
					<WrapperHeaderAccount>
						<UserOutlined style={{ fontSize: "3rem" }} />
						<div
							onClick={handleNavigateLogin}
							style={{ cursor: "pointer" }}
						>
							<span>Đăng nhập / Đăng ký</span>
							<div>
								<span>Tài khoản</span>
								<CaretDownOutlined />
							</div>
						</div>
					</WrapperHeaderAccount>

					<WrapperTextHeaderCart>
						<Badge count={4} size="small">
							<ShoppingCartOutlined
								style={{ fontSize: "3rem", color: "#fff" }}
							/>
						</Badge>
						<span>Giỏ hàng</span>
					</WrapperTextHeaderCart>
				</Col>
			</WrapperHeader>
		</div>
	);
};

export default HeaderComponent;
