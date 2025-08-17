import { Menu } from "antd";
import { useState } from "react";
import { getLevelKeys } from "../../utils";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent.";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";

const AdminPage = () => {
	const items = [
		{
			key: "user",
			icon: <UserOutlined />,
			label: "Người dùng",
		},
		{
			key: "product",
			icon: <AppstoreOutlined />,
			label: "Sản phẩm",
		},
	];

	const levelKeys = getLevelKeys(items);
	const [keySelected, setKeySelected] = useState("");

	const renderPage = (key) => {
		switch (key) {
			case "user":
				return <AdminUser />;

			case "product":
				return <AdminProduct />;

			default:
				return <></>;
		}
	};

	const handleOnClick = ({ key }) => {
		setKeySelected(key);
	};

	return (
		<>
			<HeaderComponent isHiddenSearch isHiddenCart />

			<div style={{ display: "flex" }}>
				<Menu
					mode="inline"
					defaultSelectedKeys={["231"]}
					style={{
						width: 256,
						boxShadow: "1px 1px 2px #ccc",
					}}
					items={items}
					onClick={handleOnClick}
				/>

				<div style={{ flex: "1", padding: "15px" }}>
					{renderPage(keySelected)}
				</div>
			</div>
		</>
	);
};

export default AdminPage;
