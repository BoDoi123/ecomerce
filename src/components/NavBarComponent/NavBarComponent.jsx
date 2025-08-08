import { Checkbox, Rate } from "antd";
import {
	WrapperContent,
	WrapperLabelText,
	WrapperTextPrice,
	WrapperTextValue,
} from "./style";

const NavBarComponent = () => {
	const onChange = () => {};

	const renderContent = (type, options) => {
		switch (type) {
			case "text":
				return options.map((option) => {
					return (
						<WrapperTextValue key={option}>
							{option}
						</WrapperTextValue>
					);
				});

			case "checkbox":
				return (
					<Checkbox.Group
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							gap: "12px",
						}}
						onChange={onChange}
					>
						{options.map((option) => {
							return (
								<Checkbox
									value={option.value}
									key={option.label}
								>
									{option.label}
								</Checkbox>
							);
						})}
					</Checkbox.Group>
				);

			case "star":
				return options.map((option) => {
					return (
						<div style={{ display: "flex" }}>
							<Rate
								style={{ fontSize: "1.2rem" }}
								disabled
								defaultValue={option}
								key={option}
							/>

							<WrapperTextValue>
								{`tu ${option} sao`}
							</WrapperTextValue>
						</div>
					);
				});

			case "price":
				return options.map((option) => {
					return <WrapperTextPrice>{option}</WrapperTextPrice>;
				});
			default:
				return {};
		}
	};

	return (
		<div>
			<WrapperLabelText>Label</WrapperLabelText>

			<WrapperContent>
				{renderContent("text", ["Tu lanh", "TV", "May giat"])}
			</WrapperContent>

			<WrapperContent>
				{renderContent("checkbox", [
					{ value: "a", label: "A" },
					{ value: "b", label: "B" },
				])}
			</WrapperContent>

			<WrapperContent>{renderContent("star", [3, 4, 5])}</WrapperContent>

			<WrapperContent>
				{renderContent("price", ["duoi 40", "tren 50"])}
			</WrapperContent>
		</div>
	);
};

export default NavBarComponent;
