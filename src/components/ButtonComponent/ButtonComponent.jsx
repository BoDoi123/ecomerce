import { Button } from "antd";

const ButtonComponent = ({
	size,
	styleButton,
	textButton,
	disabled,
	...rests
}) => {
	return (
		<Button
			disabled={disabled}
			style={{
				...styleButton,
				background: disabled ? "#ccc" : styleButton?.background,
			}}
			size={size}
			{...rests}
		>
			{textButton}
		</Button>
	);
};

export default ButtonComponent;
