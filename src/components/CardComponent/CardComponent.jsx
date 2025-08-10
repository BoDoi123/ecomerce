import {
	StyleNameProduct,
	WrapperCardStyle,
	WrapperDiscountText,
	WrapperPriceText,
	WrapperReportText,
	WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";

const CardComponent = () => {
	return (
		<WrapperCardStyle
			hoverable
			style={{ width: 200 }}
			bodyStyle={{ padding: "10px" }}
			cover={
				<img
					alt="example"
					src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
				/>
			}
		>
			<StyleNameProduct>Iphone</StyleNameProduct>

			<WrapperReportText>
				<span>
					4.96
					<StarFilled
						style={{
							fontSize: "1.2rem",
							color: "rgb(253, 216, 54)",
							margin: "0 4px",
						}}
					/>
				</span>
				<WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
			</WrapperReportText>

			<WrapperPriceText>
				<span style={{ marginRight: "8px" }}>1.000.000d</span>{" "}
				<WrapperDiscountText>-5%</WrapperDiscountText>
			</WrapperPriceText>
		</WrapperCardStyle>
	);
};

export default CardComponent;
