import { Input } from "antd";

const InputComponent = ({ size, placeholder, style, ...rests }) => {
	return (
		<Input
			size={size}
			placeholder={placeholder}
			style={style}
			allowClear
			{...rests}
		/>
	);
};

export default InputComponent;
