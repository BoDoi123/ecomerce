import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const ButtonInputSearch = (props) => {
	const {
		size,
		placeholder,
		textButton,
		bordered = false,
		backgroundColorInput = "#fff",
		backgroundColorIButton = "rgb(13, 92, 182)",
		colorButton = "#fff",
	} = props;
	return (
		<div style={{ display: "flex", backgroundColor: "#fff" }}>
			<Input
				size={size}
				placeholder={placeholder}
				style={{
					backgroundColor: backgroundColorInput,
					border: !bordered && "none",
					borderRadius: "0",
				}}
				allowClear
			/>
			<Button
				size={size}
				style={{
					backgroundColor: backgroundColorIButton,
					border: !bordered && "none",
					borderRadius: "0",
					color: colorButton,
				}}
				icon={<SearchOutlined />}
			>
				{textButton}
			</Button>
		</div>
	);
};

export default ButtonInputSearch;
