import { Checkbox } from "antd";
import {
	WrapperCountOrder,
	WrapperInfo,
	WrapperItemOrder,
	WrapperLeft,
	WrapperListOrder,
	WrapperPriceDiscount,
	WrapperRight,
	WrapperStyleHeader,
	WrapperTotal,
} from "./style";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
	WrapperInputNumber,
	WrapperQuantityProduct,
} from "../../components/ProductDetailsComponent/style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imag from "../../assets/imgs/test.webp";
import { useDispatch, useSelector } from "react-redux";
import {
	decreaseAmount,
	increaseAmount,
	removeAllOrderProduct,
	removeOrderProduct,
} from "../../redux/slides/orderSlide";
import { useState } from "react";

const OrderPage = ({ count = 1 }) => {
	const order = useSelector((state) => {
		return state.order;
	});
	const [listChecked, setListChecked] = useState([]);
	const dispatch = useDispatch();

	const onChange = (e) => {
		if (listChecked.includes(e.target.value)) {
			const newListChecked = listChecked.filter(
				(item) => item !== e.target.value
			);

			setListChecked(newListChecked);
		} else {
			setListChecked([...listChecked, e.target.value]);
		}
	};

	console.log(listChecked);

	const handleChangeCount = (type, idProduct) => {
		if (type === "increase") {
			dispatch(increaseAmount({ idProduct }));
		} else {
			dispatch(decreaseAmount({ idProduct }));
		}
	};

	const handleDeleteOrder = (idProduct) => {
		dispatch(removeOrderProduct({ idProduct }));
	};

	const handleOnChangeCheckAll = (e) => {
		if (e.target.checked) {
			const newListChecked = [];

			order?.orderItems?.forEach((item) => {
				newListChecked.push(item?.product);
			});

			setListChecked(newListChecked);
		} else {
			setListChecked([]);
		}
	};

	const handleRemoveAllOrder = () => {
		if (listChecked?.length > 1) {
			dispatch(removeAllOrderProduct({ listChecked }));
			setListChecked([]);
		}
	};

	return (
		<div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
			<div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
				<h3 style={{ fontSize: "1.6rem" }}>Giỏ hàng</h3>

				<div style={{ display: "flex", justifyContent: "center" }}>
					<WrapperLeft>
						<WrapperStyleHeader>
							<span
								style={{
									display: "inline-block",
									width: "390px",
								}}
							>
								<Checkbox
									checked={
										listChecked?.length ===
										order?.orderItems?.length
									}
									onChange={handleOnChangeCheckAll}
								></Checkbox>{" "}
								<span>
									Tất cả ({order?.orderItems?.length} sản
									phẩm)
								</span>
							</span>

							<div
								style={{
									flex: "1",
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<span>Đơn giá</span>
								<span>Số lượng</span>
								<span>Thành tiền</span>

								<DeleteOutlined
									onClick={handleRemoveAllOrder}
									style={{
										fontSize: "16px",
										cursor: "pointer",
									}}
								/>
							</div>
						</WrapperStyleHeader>

						<WrapperListOrder>
							{order?.orderItems?.map((order) => {
								return (
									<WrapperItemOrder>
										<div
											style={{
												width: "390px",
												display: "flex",
												alignItems: "center",
												gap: "4",
											}}
										>
											<Checkbox
												checked={listChecked.includes(
													order?.product
												)}
												onChange={onChange}
												value={order?.product}
											></Checkbox>

											<img
												src={imag}
												style={{
													width: "77px",
													height: "79px",
													objectFit: "cover",
												}}
											/>
											<div
												style={{
													fontSize: "1.5rem",
													width: "260px",
													overflow: "hidden",
													textOverflow: "ellipsis",
													whiteSpace: "nowrap",
												}}
											>
												{order?.name}
											</div>
										</div>

										<div
											style={{
												flex: "1",
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
											}}
										>
											<span>
												<span
													style={{
														color: "#242424",
														fontSize: "1.6rem",
													}}
												>
													{order?.price}
												</span>
											</span>

											<WrapperCountOrder>
												<button
													style={{
														border: "none",
														background:
															"transparent",
														cursor: "pointer",
													}}
													onClick={() =>
														handleChangeCount(
															"decrease",
															order?.product
														)
													}
												>
													<MinusOutlined
														style={{
															color: "#000",
															fontSize: "10px",
														}}
													/>
												</button>

												<WrapperInputNumber
													defaultValue={order?.amount}
													value={order?.amount}
													size="small"
												/>

												<button
													style={{
														border: "none",
														background:
															"transparent",
														cursor: "pointer",
													}}
													onClick={() =>
														handleChangeCount(
															"increase",
															order?.product
														)
													}
												>
													<PlusOutlined
														style={{
															color: "#000",
															fontSize: "10px",
														}}
													/>
												</button>
											</WrapperCountOrder>

											<span
												style={{
													color: "rgb(255, 66, 78)",
													fontSize: "1.6rem",
													fontWeight: "500",
												}}
											>
												{order?.price * order?.amount}
											</span>

											<DeleteOutlined
												style={{
													cursor: "pointer",
													fontSize: "1.6rem",
												}}
												onClick={() =>
													handleDeleteOrder(
														order?.product
													)
												}
											/>
										</div>
									</WrapperItemOrder>
								);
							})}
						</WrapperListOrder>
					</WrapperLeft>

					<WrapperRight>
						<div style={{ width: "100%" }}>
							<WrapperInfo>
								<div
									style={{
										marginBottom: "4px",
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										fontSize: "1.5rem",
									}}
								>
									<span>Tạm tính</span>
									<span
										style={{
											color: "#000",
											fontSize: "1.5rem",
											fontWeight: "500",
										}}
									>
										0
									</span>
								</div>

								<div
									style={{
										marginBottom: "4px",
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										fontSize: "1.5rem",
									}}
								>
									<span>Giảm giá</span>
									<span
										style={{
											color: "#000",
											fontSize: "1.5rem",
											fontWeight: "500",
										}}
									>
										0
									</span>
								</div>

								<div
									style={{
										marginBottom: "4px",
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										fontSize: "1.5rem",
									}}
								>
									<span>Thuế</span>
									<span
										style={{
											color: "#000",
											fontSize: "1.5rem",
											fontWeight: "500",
										}}
									>
										0
									</span>
								</div>

								<div
									style={{
										marginBottom: "4px",
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										fontSize: "1.5rem",
									}}
								>
									<span>Phí giao hàng</span>
									<span
										style={{
											color: "#000",
											fontSize: "1.5rem",
											fontWeight: "500",
										}}
									>
										0
									</span>
								</div>
							</WrapperInfo>

							<WrapperTotal>
								<span style={{ fontSize: "1.5rem" }}>
									Tống tiền
								</span>

								<span
									style={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<span
										style={{
											color: "rgb(254, 56, 52)",
											fontSize: "2.4rem",
											textAlign: "right",
										}}
									>
										0213
									</span>

									<span
										style={{
											color: "#000",
											fontSize: "1.5rem",
										}}
									>
										Đã bao gồm VAT
									</span>
								</span>
							</WrapperTotal>
						</div>

						<ButtonComponent
							size={40}
							styleButton={{
								background: "rgb(255, 57, 69",
								height: "48px",
								width: "220px",
								border: "none",
								borderRadius: "4px",
								color: "#fff",
								fontSize: "1.5rem",
								fontWeight: 500,
							}}
							textButton={"Mua hàng"}
						></ButtonComponent>
					</WrapperRight>
				</div>
			</div>
		</div>
	);
};

export default OrderPage;
