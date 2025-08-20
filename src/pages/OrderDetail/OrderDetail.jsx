import {
	WrapperContainer,
	WrapperInfo,
	WrapperValue,
	Label,
	WrapperItemOrder,
} from "./style";
import { useLocation } from "react-router-dom";
import { convertPrice } from "../../utils";
import { orderConstant } from "../../constant";
import Loading from "../../components/LoadingComponent/Loading";

const OrderDetail = () => {
	const location = useLocation();
	const { state } = location;
	console.log(state);

	const renderProduct = (orderItems) => {
		return orderItems?.map((order) => (
			<WrapperItemOrder key={order?._id}>
				<div
					style={{
						width: "390px",
						display: "flex",
						alignItems: "center",
						gap: "4px",
					}}
				>
					<img
						src={order?.image}
						style={{
							width: "77px",
							height: "79px",
							objectFit: "cover",
							border: "1px solid rgb(238, 238, 238)",
							padding: "2px",
						}}
					/>
					<div
						style={{
							fontSize: "1.5rem",
							width: "260px",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							marginLeft: "10px",
						}}
					>
						{order?.name}
					</div>
				</div>
				<div
					style={{
						flex: 1,
						display: "flex",
						alignItems: "flex-end",
						flexDirection: "column",
						gap: "10px",
					}}
				>
					<span style={{ fontSize: "1.6rem" }}>
						Giá tiền: {convertPrice(order?.price)}
					</span>
					<span
						style={{
							color: "rgb(255, 66, 78)",
							fontSize: "1.6rem",
							fontWeight: "500",
						}}
					>
						Số lượng: {order?.amount}
					</span>
				</div>
			</WrapperItemOrder>
		));
	};

	return (
		<div
			style={{ background: "#f5f5fa", width: "100%", minHeight: "100vh" }}
		>
			<Loading isLoading={false}>
				<div
					style={{
						width: "1270px",
						margin: "0 auto",
						padding: "20px 0",
					}}
				>
					<h3 style={{ fontSize: "1.8rem", marginTop: 0 }}>
						Chi tiết đơn hàng
					</h3>
					<div style={{ display: "flex", justifyContent: "center" }}>
						<WrapperContainer>
							<WrapperInfo>
								<div>
									<Label>Trạng thái đơn hàng</Label>
									<WrapperValue>
										<div
											style={{
												marginBottom: "4px",
												fontSize: "1.6rem",
											}}
										>
											<span
												style={{
													color: "rgb(255, 66, 78)",
												}}
											>
												Giao hàng:{" "}
											</span>
											{`${
												state?.order?.isDelivered
													? "Đã giao hàng"
													: "Chưa giao hàng"
											}`}
										</div>
										<div
											style={{
												marginBottom: "4px",
												fontSize: "1.6rem",
											}}
										>
											<span
												style={{
													color: "rgb(255, 66, 78)",
												}}
											>
												Thanh toán:{" "}
											</span>
											{`${
												state?.order?.isPaid
													? "Đã thanh toán"
													: "Chưa thanh toán"
											}`}
										</div>
									</WrapperValue>
								</div>
							</WrapperInfo>

							<WrapperInfo>
								<div>
									<Label>Phương thức giao hàng</Label>
									<WrapperValue
										style={{ fontSize: "1.5rem" }}
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
													state?.order?.delivery
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
										style={{ fontSize: "1.5rem" }}
									>
										{
											orderConstant.payment[
												state?.order?.payment
											]
										}
									</WrapperValue>
								</div>
							</WrapperInfo>

							<div style={{ margin: "20px 0" }}>
								<Label>Danh sách sản phẩm</Label>
								{renderProduct(state?.order?.orderItems)}
							</div>

							<div
								style={{
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
									{convertPrice(state?.order?.totalPrice)}
								</span>
							</div>
						</WrapperContainer>
					</div>
				</div>
			</Loading>
		</div>
	);
};

export default OrderDetail;
