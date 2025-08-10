import { Col, Image, InputNumber, Row } from "antd";
import imageProduct from "../../assets/imgs/test.webp";
import imageProductSmall from "../../assets/imgs/img_small.webp";
import {
	WrapperAddressTextProduct,
	WrapperInputNumber,
	WrapperPriceProduct,
	WrapperPriceTextProduct,
	WrapperQuantityProduct,
	WrapperStyleColImage,
	WrapperStyleImageSmall,
	WrapperStyleNameProduct,
	WrapperStyleTextSell,
} from "./style";
import { StarFilled, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ProductDetailsComponent = () => {
	const onChange = () => {};

	return (
		<Row
			style={{ padding: "16px", background: "#fff", borderRadius: "4px" }}
		>
			<Col
				span={10}
				style={{
					borderRight: "1px solid #e5e5e5",
					paddingRight: "8px",
				}}
			>
				<Image src={imageProduct} alt="image product" preview={false} />

				<Row
					style={{
						paddingTop: "12px",
						justifyContent: "space-between",
					}}
				>
					<WrapperStyleColImage span={4}>
						<WrapperStyleImageSmall
							src={imageProductSmall}
							alt="image small"
							preview={false}
						/>
					</WrapperStyleColImage>
					<WrapperStyleColImage span={4}>
						<WrapperStyleImageSmall
							src={imageProductSmall}
							alt="image small"
							preview={false}
						/>
					</WrapperStyleColImage>
					<WrapperStyleColImage span={4}>
						<WrapperStyleImageSmall
							src={imageProductSmall}
							alt="image small"
							preview={false}
						/>
					</WrapperStyleColImage>
					<WrapperStyleColImage span={4}>
						<WrapperStyleImageSmall
							src={imageProductSmall}
							alt="image small"
							preview={false}
						/>
					</WrapperStyleColImage>
					<WrapperStyleColImage span={4}>
						<WrapperStyleImageSmall
							src={imageProductSmall}
							alt="image small"
							preview={false}
						/>
					</WrapperStyleColImage>
					<WrapperStyleColImage span={4}>
						<WrapperStyleImageSmall
							src={imageProductSmall}
							alt="image small"
							preview={false}
						/>
					</WrapperStyleColImage>
				</Row>
			</Col>

			<Col span={14} style={{ paddingLeft: "6px" }}>
				<WrapperStyleNameProduct>
					Thám Tử Lừng Danh Conan 54
				</WrapperStyleNameProduct>

				<div>
					<StarFilled
						style={{
							fontSize: "1.2rem",
							color: "rgb(253, 216, 54)",
							marginRight: "4px",
						}}
					/>
					<StarFilled
						style={{
							fontSize: "1.2rem",
							color: "rgb(253, 216, 54)",
							marginRight: "4px",
						}}
					/>
					<StarFilled
						style={{
							fontSize: "1.2rem",
							color: "rgb(253, 216, 54)",
							marginRight: "4px",
						}}
					/>

					<WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
				</div>

				<WrapperPriceProduct>
					<WrapperPriceTextProduct>200.000</WrapperPriceTextProduct>
				</WrapperPriceProduct>

				<WrapperAddressTextProduct>
					<span>Giao đến </span>
					<span className="address">
						Q.1, P.Bến Nghé, Hồ Chí Minh
					</span>{" "}
					-<span className="change-address">Đổi địa chỉ</span>
				</WrapperAddressTextProduct>

				<div
					style={{
						margin: "10px 0 20px",
						padding: "10px 0",
						borderTop: "1px solid #e5e5e5",
						borderBottom: "1px solid #e5e5e5,",
					}}
				>
					<div style={{ marginBottom: "6px" }}>Số lượng</div>
					<WrapperQuantityProduct>
						<button
							style={{
								border: "none",
								background: "transparent",
							}}
						>
							<MinusOutlined
								style={{ fontSize: "20px", color: "#000" }}
							/>
						</button>
						<WrapperInputNumber
							defaultValue={3}
							onChange={onChange}
						/>
						<button
							style={{
								border: "none",
								background: "transparent",
							}}
						>
							<PlusOutlined
								style={{
									fontSize: "20px",
									color: "#000",
								}}
							/>
						</button>
					</WrapperQuantityProduct>
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "12px",
					}}
				>
					<ButtonComponent
						size={40}
						style={{
							backgroundColor: "rgb(255, 57, 69)",
							color: "#fff",
							fontSize: "1.5rem",
							fontWeight: "700",
							height: "48px",
							width: "220px",
							border: "none",
						}}
						textButton={"Chọn mua"}
					></ButtonComponent>

					<ButtonComponent
						size={40}
						style={{
							backgroundColor: "#fff",
							color: "rgb(13, 92, 182)",
							fontSize: "1.5rem",
							height: "48px",
							width: "220px",
							border: "1px solid rgb(13, 92, 182)",
						}}
						textButton={"Mua trả sau"}
					></ButtonComponent>
				</div>
			</Col>
		</Row>
	);
};

export default ProductDetailsComponent;
