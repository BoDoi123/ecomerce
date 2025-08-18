import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

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
			<InputComponent
				size={size}
				placeholder={placeholder}
				style={{
					backgroundColor: backgroundColorInput,
					border: !bordered && "none",
					borderRadius: "0",
				}}
				allowClear
				{...props}
			/>
			<ButtonComponent
				size={size}
				style={{
					backgroundColor: backgroundColorIButton,
					border: !bordered && "none",
					borderRadius: "0",
					color: colorButton,
				}}
				textButton={textButton}
				icon={<SearchOutlined />}
			></ButtonComponent>
		</div>
	);
};

export default ButtonInputSearch;
