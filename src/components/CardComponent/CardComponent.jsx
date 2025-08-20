import { useNavigate } from "react-router";
import {
	StyleNameProduct,
	WrapperCardStyle,
	WrapperDiscountText,
	WrapperPriceText,
	WrapperReportText,
	WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import { convertPrice } from "../../utils";

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
		id,
	} = props;
	const navigate = useNavigate();

	const handleDetailsProduct = (id) => {
		navigate(`/product-details/${id}`);
	};

	return (
		<WrapperCardStyle
			hoverable
			style={{ width: 200 }}
			bodyStyle={{ padding: "10px" }}
			cover={<img alt="example" src={image} />}
			onClick={() => countInStock !== 0 && handleDetailsProduct(id)}
			disabled={countInStock === 0}
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
				<WrapperStyleTextSell> | Đã bán {sold}+</WrapperStyleTextSell>
			</WrapperReportText>

			<WrapperPriceText>
				<span style={{ marginRight: "8px" }}>
					{convertPrice(price)}{" "}
				</span>{" "}
				<WrapperDiscountText>- {discount || 5}%</WrapperDiscountText>
			</WrapperPriceText>
		</WrapperCardStyle>
	);
};

export default CardComponent;
