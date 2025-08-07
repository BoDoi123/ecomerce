import {
	StyleNameProduct,
	WrapperCardStyle,
	WrapperDiscountText,
	WrapperPriceText,
	WrapperReportText,
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
							color: "yellow",
							margin: "0 4px",
						}}
					/>
				</span>
				<span> | Đã bán 1000+</span>
			</WrapperReportText>

			<WrapperPriceText>
				1.000.000d <WrapperDiscountText>-5%</WrapperDiscountText>
			</WrapperPriceText>
		</WrapperCardStyle>
	);
};

export default CardComponent;
