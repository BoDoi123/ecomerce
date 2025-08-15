import { WrapperInputStyle } from "./style";

const InputForm = ({
	placeholder = "Nhập text",
	value,
	onChange,
	style,
	...rests
}) => {
	const handleOnChangeInput = (e) => {
		onChange(e.target.value);
	};

	return (
		<WrapperInputStyle
			placeholder={placeholder}
			value={value}
			onChange={handleOnChangeInput}
			style={style}
			{...rests}
		/>
	);
};

export default InputForm;
