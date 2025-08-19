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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/userService";
import { resetUser } from "../../redux/slides/userSlide";
import { useEffect, useState } from "react";
import Loading from "../LoadingComponent/Loading";
import { searchProduct } from "../../redux/slides/productSlide";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [userName, setUserName] = useState("");
	const [userAvatar, setUserAvatar] = useState("");
	const [search, setSearch] = useState("");
	const order = useSelector((state) => state.order);
	const user = useSelector((state) => state.user);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setUserName(user?.name || user?.email);
		setUserAvatar(user?.avatar);
		setLoading(false);
	}, [user?.name, user?.email, user?.avatar]);

	const handleNavigateLogin = () => {
		localStorage.removeItem("access_token");
		navigate("/sign-in");
	};

	const handleLogout = async () => {
		setLoading(true);
		await UserService.logoutUser();
		dispatch(resetUser());
		localStorage.removeItem("access_token");
		setLoading(false);
	};

	const content = (
		<div>
			<WrapperContentPopup onClick={() => navigate("/profile-user")}>
				Thông tin người dùng
			</WrapperContentPopup>

			{user?.isAdmin && (
				<WrapperContentPopup onClick={() => navigate("/system/admin")}>
					Quản lý hệ thống
				</WrapperContentPopup>
			)}

			<WrapperContentPopup onClick={handleLogout}>
				Đăng xuất
			</WrapperContentPopup>
		</div>
	);

	const onSearch = (e) => {
		setSearch(e.target.value);
		dispatch(searchProduct(e.target.value));
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
			<WrapperHeader
				style={{
					justifyContent:
						isHiddenCart && isHiddenSearch
							? "space-between"
							: "unset",
				}}
			>
				<Col span={5}>
					<WrapperTextHeader>LAPTRINHTHATDE</WrapperTextHeader>
				</Col>

				{!isHiddenSearch && (
					<Col span={13}>
						<ButtonInputSearch
							size="large"
							placeholder="input search text"
							textButton="Tìm kiếm"
							onChange={onSearch}
						/>
					</Col>
				)}

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
							{userAvatar ? (
								<img
									src={userAvatar}
									alt="avatar"
									style={{
										height: "30px",
										width: "30px",
										borderRadius: "50%",
										objectFit: "cover",
									}}
								/>
							) : (
								<UserOutlined style={{ fontSize: "3rem" }} />
							)}

							{user?.access_token ? (
								<>
									<Popover content={content} trigger="click">
										<div
											style={{
												cursor: "pointer",
												fontSize: "1.4rem",
											}}
										>
											{userName}
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

					{!isHiddenCart && (
						<WrapperTextHeaderCart
							onClick={() => navigate("/order")}
							style={{ cursor: "pointer" }}
						>
							<Badge
								count={order?.orderItems?.length}
								size="small"
							>
								<ShoppingCartOutlined
									style={{ fontSize: "3rem", color: "#fff" }}
								/>
							</Badge>
							<span>Giỏ hàng</span>
						</WrapperTextHeaderCart>
					)}
				</Col>
			</WrapperHeader>
		</div>
	);
};

export default HeaderComponent;
