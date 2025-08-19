import { Col, Image, InputNumber, Rate, Row } from "antd";
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
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import Loading from "../LoadingComponent/Loading";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slides/orderSlide";

const ProductDetailsComponent = ({ idProduct }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const [numProduct, setNumProduct] = useState(1);
	const user = useSelector((state) => state.user);

	const onChange = (e) => {
		setNumProduct(Number(e.target.value));
	};

	const fetchProductDetails = async (context) => {
		const id = context?.queryKey && context?.queryKey[1];

		if (id) {
			const res = await ProductService.getDetailsProduct(id);
			return res.data;
		}
	};

	const handleChangeCount = (type) => {
		if (type === "increase") {
			setNumProduct(numProduct ? numProduct + 1 : 1);
		} else {
			setNumProduct(numProduct > 1 ? numProduct - 1 : 1);
		}
	};

	const { isLoading, data: productDetails } = useQuery({
		queryKey: ["products-details", idProduct],
		queryFn: fetchProductDetails,
		retry: 3,
		retryDelay: 1000,
		enabled: !!idProduct,
	});

	const handleAddOrderProduct = () => {
		if (!user?.id) {
			navigate("/sign-in", { state: location.pathname });
		} else {
			dispatch(
				addOrderProduct({
					orderItem: {
						name: productDetails?.name,
						amount: numProduct,
						image: productDetails?.image,
						price: productDetails?.price,
						product: productDetails?._id,
					},
				})
			);
		}
	};

	return (
		<Loading isLoading={isLoading}>
			<Row
				style={{
					padding: "16px",
					background: "#fff",
					borderRadius: "4px",
				}}
			>
				<Col
					span={10}
					style={{
						borderRight: "1px solid #e5e5e5",
						paddingRight: "8px",
					}}
				>
					<Image
						src={productDetails?.image}
						alt="image product"
						preview={false}
					/>

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
						{productDetails?.name}
					</WrapperStyleNameProduct>

					<div>
						<Rate
							allowHalf
							defaultValue={productDetails?.rating}
							value={productDetails?.rating}
						/>

						<WrapperStyleTextSell>
							{" "}
							| Đã bán 1000+
						</WrapperStyleTextSell>
					</div>

					<WrapperPriceProduct>
						<WrapperPriceTextProduct>
							{productDetails?.price}
						</WrapperPriceTextProduct>
					</WrapperPriceProduct>

					<WrapperAddressTextProduct>
						<span>Giao đến </span>
						<span className="address">{user?.address}</span> -
						<span className="change-address">Đổi địa chỉ</span>
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
									cursor:
										numProduct === 1
											? "not-allowed"
											: "pointer",
								}}
								onClick={() => handleChangeCount("decrease")}
							>
								<MinusOutlined
									style={{ fontSize: "20px", color: "#000" }}
								/>
							</button>
							<WrapperInputNumber
								onChange={onChange}
								value={numProduct}
							/>
							<button
								style={{
									border: "none",
									background: "transparent",
									cursor: "pointer",
								}}
								onClick={() => handleChangeCount("increase")}
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
							onClick={handleAddOrderProduct}
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
		</Loading>
	);
};

export default ProductDetailsComponent;
