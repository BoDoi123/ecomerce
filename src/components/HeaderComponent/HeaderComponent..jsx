import { Badge, Button, Col, Popover } from "antd";
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
	WrapperContentPopup,
} from "./style";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/userService";
import { resetUser } from "../../redux/slides/userSlide";
import { useState } from "react";
import Loading from "../LoadingComponent/Loading";

const HeaderComponent = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [loading, setLoading] = useState(false);

	const handleNavigateLogin = () => {
		navigate("./sign-in");
	};

	const handleLogout = async () => {
		setLoading(true);
		await UserService.logoutUser();
		dispatch(resetUser());
		setLoading(false);
	};

	const content = (
		<div>
			<WrapperContentPopup onClick={handleLogout}>
				Đăng xuất
			</WrapperContentPopup>
			<WrapperContentPopup>Thông tin người dùng</WrapperContentPopup>
		</div>
	);

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
					<Loading isLoading={loading}>
						<WrapperHeaderAccount>
							<UserOutlined style={{ fontSize: "3rem" }} />
							{user?.name ? (
								<>
									<Popover content={content} trigger="click">
										<div
											style={{
												cursor: "pointer",
												fontSize: "1.4rem",
											}}
										>
											{user.name}
										</div>
									</Popover>
								</>
							) : (
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
							)}
						</WrapperHeaderAccount>
					</Loading>

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
