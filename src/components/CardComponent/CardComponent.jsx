import {
	StyleNameProduct,
	WrapperCardStyle,
	WrapperDiscountText,
	WrapperPriceText,
	WrapperReportText,
	WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";

const CardComponent = (props) => {
	const {
		countInStock,
		description,
		image,
		name,
		price,
		rating,
		type,
		discount,
		sold,
	} = props;

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
			<StyleNameProduct>{name}</StyleNameProduct>

			<WrapperReportText>
				<span>
					{rating}
					<StarFilled
						style={{
							fontSize: "1.2rem",
							color: "rgb(253, 216, 54)",
							margin: "0 4px",
						}}
					/>
				</span>
				<WrapperStyleTextSell>
					{" "}
					| Đã bán {sold || 1000}+
				</WrapperStyleTextSell>
			</WrapperReportText>

			<WrapperPriceText>
				<span style={{ marginRight: "8px" }}>{price} </span>{" "}
				<WrapperDiscountText>{discount || 5}%</WrapperDiscountText>
			</WrapperPriceText>
		</WrapperCardStyle>
	);
};

export default CardComponent;
