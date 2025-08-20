import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderService";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import {
	WrapperItemOrder,
	WrapperListOrder,
	WrapperHeaderItem,
	WrapperFooterItem,
	WrapperContainer,
	WrapperStatus,
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useLocation, useNavigate } from "react-router-dom";

const MyOrder = () => {
	const location = useLocation();
	const { state } = location;
    const navigate = useNavigate();
	console.log(location);

	const fetchMyOrder = async () => {
		const res = await OrderService.getOrderByUserId(
			state?.id,
			state?.access_token
		);

		return res.data;
	};

	const queryOrder = useQuery({
		queryKey: ["order"],
		queryFn: fetchMyOrder,
		enabled: !!(state?.id && state?.token),
	});
	const { isLoading, data } = queryOrder;

	const handleDetailsOrder = (id) => {
        navigate()
    };

	const renderProduct = (data) => {
		return data?.map((order) => {
			return (
				<WrapperHeaderItem>
					<img
						src={order?.image}
						style={{
							width: "70px",
							height: "70ox",
							objectFit: "cover",
							border: "1px solid rgb(238, 238, 238)",
							padding: "2px",
						}}
					/>

					<div
						style={{
							width: "260px",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							marginLeft: "10px",
						}}
					>
						{order?.name}
					</div>

					<span
						style={{
							fontSize: "1.3rem",
							color: "#242424",
							marginLeft: "auto",
						}}
					>
						{convertPrice(order?.price)}
					</span>
				</WrapperHeaderItem>
			);
		});
	};

	return (
		<Loading isLoading={isLoading}>
			<WrapperContainer>
				<div
					style={{
						width: "100%",
						height: "1270px",
						margin: "0 auto",
					}}
				>
					<h4>Đơn hàng của tôi</h4>

					<WrapperListOrder>
						{data?.map((order) => {
							return (
								<WrapperItemOrder key={order?._id}>
									<WrapperStatus>
										<span
											style={{
												fontSize: "1.4rem",
												fontWeight: "bold",
											}}
										>
											Trạng thái
										</span>

										<div>
											<span
												style={{
													color: "rgb(255, 66, 78)",
												}}
											>
												Giao hàng:{" "}
											</span>{" "}
											{`${
												order.isDeliverd
													? "Đã giao hàng"
													: "Chưa giao hàng"
											}`}
										</div>

										<div>
											<span
												style={{
													color: "rgb(255, 66, 78)",
												}}
											>
												Thanh toán:{" "}
											</span>{" "}
											{`${
												order.isPaid
													? "Đã thanh toán"
													: "Chưa thanh toán"
											}`}
										</div>
									</WrapperStatus>

									{renderProduct(order?.orderItems)}

									<WrapperFooterItem>
										<div>
											<span
												style={{
													color: "rgb(255, 66, 78)",
												}}
											>
												Tổng tiền:{" "}
											</span>

											<span
												style={{
													fontSize: "1.3rem",
													color: "rgb(56, 56, 61)",
													fontWeight: "700",
												}}
											>
												{convertPrice(
													order?.totalPrice
												)}
											</span>
										</div>

										<div
											style={{
												display: "flex",
												gap: "10px",
											}}
										>
											<ButtonComponent
												size={40}
												styleButton={{
													height: "36px",
													border: "1px solid rgb(11 116 229)",
													borderRadius: "4px",
													color: "rgb(11, 116, 229)",
													fontSize: "1.4rem",
												}}
												textButton={"Hủy đơn hàng"}
											></ButtonComponent>

											<ButtonComponent
												onClick={() =>
													handleDetailsOrder(
														order?._id
													)
												}
												size={40}
												styleButton={{
													height: "36px",
													border: "1px solid rgb(11, 116, 229)",
													color: "rgb(11, 116, 229)",
													fontSize: "1.4rem",
												}}
												textButton={"Xem chi tiết"}
											></ButtonComponent>
										</div>
									</WrapperFooterItem>
								</WrapperItemOrder>
							);
						})}
					</WrapperListOrder>
				</div>
			</WrapperContainer>
		</Loading>
	);
};

export default MyOrder;
