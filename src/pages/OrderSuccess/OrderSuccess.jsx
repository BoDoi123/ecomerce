import { Form, Radio } from "antd";
import {
	Label,
	WrapperInfo,
	WrapperContainer,
	WrapperValue,
	WrapperItemOrder,
} from "./style";

import Loading from "../../components/LoadingComponent/Loading";
import { convertPrice } from "../../utils";
import { useLocation } from "react-router-dom";
import { orderConstant } from "../../constant";
import { WrapperItemOrderInfo } from "./style";

const OrderSuccess = () => {
	const location = useLocation();
	const { state } = location;

	return (
		<div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
			<Loading isLoading={false}>
				<div
					style={{
						height: "100%",
						width: "1270px",
						margin: "0 auto",
					}}
				>
					<h3 style={{ fontSize: "1.8rem", marginTop: 0 }}>
						Đơn hàng đặt thành công
					</h3>

					<div style={{ display: "flex", justifyContent: "center" }}>
						<WrapperContainer>
							<WrapperInfo>
								<div>
									<Label>Phương thức giao hàng</Label>

									<WrapperValue
										style={{
											fontSize: "1.5rem",
											marginTop: "8px",
										}}
									>
										<span
											style={{
												color: "#ea8500",
												fontWeight: "bold",
												fontSize: "1.6rem",
											}}
										>
											{
												orderConstant.delivery[
													state?.delivery
												]
											}
										</span>{" "}
										Giao hàng tiết kiệm
									</WrapperValue>
								</div>
							</WrapperInfo>

							<WrapperInfo>
								<div>
									<Label>Phương thức thanh toán</Label>

									<WrapperValue
										style={{
											fontSize: "1.5rem",
										}}
									>
										{orderConstant.payment[state?.payment]}
									</WrapperValue>
								</div>
							</WrapperInfo>

							<WrapperItemOrderInfo>
								{state.orders?.map((order) => {
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
												<img
													src={order?.image}
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
														textOverflow:
															"ellipsis",
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
													alignItems: "flex-end",
													flexDirection: "column",
													gap: "10px",
												}}
											>
												<span>
													<span
														style={{
															color: "#242424",
															fontSize: "1.6rem",
														}}
													>
														Giá tiền:{" "}
														{convertPrice(
															order?.price
														)}
													</span>
												</span>

												<span>
													<span
														style={{
															color: "rgb(255, 66, 78)",
															fontSize: "1.6rem",
															fontWeight: "500",
														}}
													>
														Số lượng:{" "}
														{order?.amount}
													</span>
												</span>
											</div>
										</WrapperItemOrder>
									);
								})}
							</WrapperItemOrderInfo>

							<div
								style={{
									marginTop: "20px",
									textAlign: "right",
									marginRight: "20px",
								}}
							>
								<span
									style={{
										color: "red",
										fontSize: "2rem",
										fontWeight: "500",
									}}
								>
									Tổng tiền:{" "}
									{convertPrice(state?.totalPriceMemo)}
								</span>
							</div>
						</WrapperContainer>
					</div>
				</div>
			</Loading>
		</div>
	);
};

export default OrderSuccess;
