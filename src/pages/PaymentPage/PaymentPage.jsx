import { Form, Radio } from "antd";
import {
	Label,
	WrapperInfo,
	WrapperLeft,
	WrapperRadio,
	WrapperRight,
	WrapperTotal,
} from "./style";
import {} from "@ant-design/icons";

import { updateUser } from "../../redux/slides/userSlide";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import Loading from "../../components/LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { convertPrice } from "../../utils";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import * as message from "../../components/Message/Message";
import { useMutationHook } from "../../hooks/useMutationHook";

const PaymentPage = ({ count = 1 }) => {
	const order = useSelector((state) => {
		return state.order;
	});
	const user = useSelector((state) => {
		return state.user;
	});

	const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
	const [delivery, setDelivery] = useState("fast");
	const [payment, setPayment] = useState("later_money");
	const [stateUserDetails, setStateUserDetails] = useState({
		name: "",
		phone: "",
		address: "",
		city: "",
	});
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	useEffect(() => {
		if (isOpenModalUpdateInfo) {
			setStateUserDetails({
				city: user?.city,
				name: user?.name,
				address: user?.address,
				phone: user?.phone,
			});
		}
	}, [isOpenModalUpdateInfo]);

	useEffect(() => {
		form.setFieldsValue(stateUserDetails);
	}, [form, stateUserDetails]);

	const priceMemo = useMemo(() => {
		const result = order?.orderItemsSelected?.reduce((total, cur) => {
			return total + cur.price * cur.amount;
		}, 0);

		return result;
	}, [order]);

	const priceDiscountMemo = useMemo(() => {
		const result = order?.orderItemsSelected?.reduce((total, cur) => {
			return total + cur.discount * cur.amount;
		}, 0);

		if (Number(result)) {
			return result;
		}

		return 0;
	}, [order]);

	const deliveryPriceMemo = useMemo(() => {
		if (priceMemo > 100000) {
			return 10000;
		} else if (priceMemo === 0) {
			return 0;
		} else {
			return 20000;
		}
	}, [priceMemo]);

	const totalPriceMemo = useMemo(() => {
		return (
			Number(priceMemo) -
			Number(priceDiscountMemo) +
			Number(deliveryPriceMemo)
		);
	}, [priceMemo, priceDiscountMemo]);

	const mutationAddOrder = useMutationHook(async (props) => {
		const { access_token, data } = props;
		const res = await OrderService.createOrder({
			access_token,
			data,
		});
		return res;
	});
	const { isPending: isPendingAddOrder, data: dataOrder } = mutationAddOrder;

	useEffect(() => {
		if (dataOrder?.status === "OK") {
			message.success("Đặt hàng thành công");
		} else if (dataOrder?.status === "ERR") {
			message.error("Có lỗi xảy ra");
		}
	}, [isPendingAddOrder]);

	const handleAddOrder = () => {
		if (
			user?.access_token &&
			order?.orderItemsSelected &&
			user?.name &&
			user?.address &&
			user?.phone &&
			user?.city &&
			priceMemo &&
			user?.id
		) {
			const data = {
				orderItems: order?.orderItemsSelected,
				fullname: user?.name,
				address: user?.address,
				phone: user?.phone,
				city: user?.city,
				paymentMethod: payment,
				itemsPrice: priceMemo,
				shippingPrice: deliveryPriceMemo,
				totalPrice: totalPriceMemo,
				user: user?.id,
			};

			mutationAddOrder.mutate({
				access_token: user?.access_token,
				data,
			});
		}
	};

	const handleCancelUpdate = () => {
		setStateUserDetails({
			name: "",
			city: "",
			phone: "",
			address: "",
		});
		form.resetFields();
		setIsOpenModalUpdateInfo(false);
	};

	const mutationUpdated = useMutationHook(async (data) => {
		const { id, access_token, stateUserDetails } = data;
		const res = await UserService.updateUser({
			id,
			access_token,
			data: stateUserDetails,
		});
		return res;
	});
	const { isPending } = mutationUpdated;

	const handleUpdateInfoUser = () => {
		const { name, address, city, phone } = stateUserDetails;

		if (name && address && city && phone) {
			mutationUpdated.mutate(
				{
					id: user?.id,
					access_token: user?.access_token,
					stateUserDetails,
				},
				{
					onSuccess: () => {
						dispatch(updateUser({ name, address, city, phone }));
						setIsOpenModalUpdateInfo(false);
					},
				}
			);
		}
	};

	const handleOnChangeDetails = (e) => {
		setStateUserDetails({
			...stateUserDetails,
			[e.target.name]: e.target.value,
		});
	};

	const handleChangeAddress = () => {
		setIsOpenModalUpdateInfo(true);
	};

	const handleDelivery = (e) => {
		setDelivery(e.target.value);
	};

	const handlePayment = (e) => {
		setPayment(e.target.value);
	};

	return (
		<div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
			<Loading isLoading={isPendingAddOrder}>
				<div
					style={{
						height: "100%",
						width: "1270px",
						margin: "0 auto",
					}}
				>
					<h3 style={{ fontSize: "1.8rem", marginTop: 0 }}>
						Thanh toán
					</h3>

					<div style={{ display: "flex", justifyContent: "center" }}>
						<WrapperLeft>
							<WrapperInfo>
								<div>
									<Label>Chọn phương thức thanh toán</Label>

									<WrapperRadio
										onChange={handleDelivery}
										value={delivery}
									>
										<Radio
											style={{ fontSize: "1.4rem" }}
											value="fast"
										>
											<span
												style={{
													color: "#ea8500",
													fontWeight: "bold",
												}}
											>
												FAST
											</span>{" "}
											Giao hàng tiết kiệm
										</Radio>
										<Radio value="gojek">
											<span
												style={{
													color: "#ea8500",
													fontWeight: "bold",
												}}
											>
												GO_JEK
											</span>{" "}
											Giao hàng tiết kiệm
										</Radio>
									</WrapperRadio>
								</div>
							</WrapperInfo>

							<WrapperInfo>
								<div>
									<Label>Chọn phương thức thanh toán</Label>

									<WrapperRadio
										onChange={handlePayment}
										value={payment}
									>
										<Radio value="later_money">
											Thanh toán tiền mặt khi nhận hàng
										</Radio>
									</WrapperRadio>
								</div>
							</WrapperInfo>
						</WrapperLeft>

						<WrapperRight>
							<div style={{ width: "100%" }}>
								<WrapperInfo>
									<div>
										<span style={{ fontSize: "1.5rem" }}>
											Địa chỉ:{" "}
										</span>

										<span
											style={{
												fontSize: "1.5rem",
												fontWeight: "bold",
											}}
										>
											{`${user?.address} ${user?.city}`}
										</span>

										<span
											onClick={handleChangeAddress}
											style={{
												cursor: "pointer",
												color: "blue",
												fontSize: "1.5rem",
											}}
										>
											Thay đổi{" "}
										</span>
									</div>
								</WrapperInfo>

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
												fontWeight: "600",
											}}
										>
											{convertPrice(priceMemo)}
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
												fontWeight: "600",
											}}
										>
											{`${priceDiscountMemo} %`}
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
												fontWeight: "600",
											}}
										>
											{convertPrice(deliveryPriceMemo)}
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
												fontWeight: "600",
											}}
										>
											{convertPrice(totalPriceMemo)}
										</span>

										<span
											style={{
												color: "#000",
												fontSize: "1.5rem",
												textAlign: "right",
											}}
										>
											Đã bao gồm VAT
										</span>
									</span>
								</WrapperTotal>
							</div>

							<ButtonComponent
								onClick={() => handleAddOrder()}
								size={40}
								styleButton={{
									background: "rgb(255, 57, 69",
									height: "48px",
									width: "320px",
									border: "none",
									borderRadius: "4px",
									color: "#fff",
									fontSize: "1.5rem",
									fontWeight: 500,
								}}
								textButton={"Đặt hàng"}
							></ButtonComponent>
						</WrapperRight>
					</div>
				</div>

				<Loading isLoading={isPending}>
					<ModalComponent
						forceRender
						title="Cập nhật thông tin giao hàng"
						closable={{ "aria-label": "Custom Close Button" }}
						open={isOpenModalUpdateInfo}
						onCancel={handleCancelUpdate}
						onOk={handleUpdateInfoUser}
					>
						<Form
							name="basic"
							labelCol={{ span: 4 }}
							wrapperCol={{ span: 20 }}
							// onFinish={onUpdateUser}
							autoComplete="on"
							form={form}
							style={{ marginTop: "50px", marginBottom: "50px" }}
						>
							{/* Name */}
							<Form.Item
								label="Name"
								name="name"
								rules={[
									{
										required: true,
										message: "Please input your name!",
									},
								]}
							>
								<InputComponent
									value={stateUserDetails.name}
									onChange={handleOnChangeDetails}
									name="name"
								/>
							</Form.Item>

							{/* City */}
							<Form.Item
								label="City"
								name="city"
								rules={[
									{
										required: true,
										message: "Please input your city!",
									},
								]}
							>
								<InputComponent
									value={stateUserDetails.city}
									onChange={handleOnChangeDetails}
									name="city"
								/>
							</Form.Item>

							{/* Phone */}
							<Form.Item
								label="Phone"
								name="phone"
								rules={[
									{
										required: true,
										message: "Please input your phone!",
									},
								]}
							>
								<InputComponent
									value={stateUserDetails.countInStock}
									onChange={handleOnChangeDetails}
									name="phone"
								/>
							</Form.Item>

							{/* Address */}
							<Form.Item
								label="Address"
								name="address"
								rules={[
									{
										required: true,
										message: "Please input your address!",
									},
								]}
							>
								<InputComponent
									value={stateUserDetails.address}
									onChange={handleOnChangeDetails}
									name="address"
								/>
							</Form.Item>
						</Form>
					</ModalComponent>
				</Loading>
			</Loading>
		</div>
	);
};

export default PaymentPage;
