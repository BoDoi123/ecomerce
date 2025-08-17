import { Menu } from "antd";
import { useState } from "react";
import { getLevelKeys } from "../../utils";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent.";

const AdminPage = () => {
	const items = [
		{
			key: "1",
			icon: <UserOutlined />,
			label: "Người dùng",
			children: [
				{ key: "11", label: "Option 1" },
				{ key: "12", label: "Option 2" },
				{ key: "13", label: "Option 3" },
				{ key: "14", label: "Option 4" },
			],
		},
		{
			key: "2",
			icon: <AppstoreOutlined />,
			label: "Sản phẩm",
			children: [
				{ key: "21", label: "Option 1" },
				{ key: "22", label: "Option 2" },
				{
					key: "23",
					label: "Submenu",
					children: [
						{ key: "231", label: "Option 1" },
						{ key: "232", label: "Option 2" },
						{ key: "233", label: "Option 3" },
					],
				},
				{
					key: "24",
					label: "Submenu 2",
					children: [
						{ key: "241", label: "Option 1" },
						{ key: "242", label: "Option 2" },
						{ key: "243", label: "Option 3" },
					],
				},
			],
		},
	];

	const levelKeys = getLevelKeys(items);
	const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);
	const [keySelected, setKeySelected] = useState("");

	const onOpenChange = (openKeys) => {
		const currentOpenKey = openKeys.find(
			(key) => stateOpenKeys.indexOf(key) === -1
		);

		if (currentOpenKey !== undefined) {
			const repeatIndex = openKeys
				.filter((key) => key !== currentOpenKey)
				.findIndex(
					(key) => levelKeys[key] === levelKeys[currentOpenKey]
				);
			setStateOpenKeys(
				openKeys
					.filter((_, index) => index !== repeatIndex)
					.filter(
						(key) => levelKeys[key] <= levelKeys[currentOpenKey]
					)
			);
		} else {
			setStateOpenKeys(openKeys);
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
					openKeys={stateOpenKeys}
					onOpenChange={onOpenChange}
					style={{ width: 256 }}
					items={items}
					onClick={handleOnClick}
				/>

				<div style={{ flex: "1" }}>
					{keySelected === "243" && <span>Key la 6</span>}
					<span>test</span>
				</div>
			</div>
		</>
	);
};

export default AdminPage;
