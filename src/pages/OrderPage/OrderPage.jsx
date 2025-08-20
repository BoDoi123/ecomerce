import { Button, Checkbox, Form } from "antd";
import {
	WrapperCountOrder,
	WrapperInfo,
	WrapperItemOrder,
	WrapperLeft,
	WrapperListOrder,
	WrapperPriceDiscount,
	WrapperRight,
	WrapperStyleHeader,
	WrapperStyleHeaderDelivery,
	WrapperTotal,
} from "./style";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import { updateUser } from "../../redux/slides/userSlide";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import Loading from "../../components/LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
	decreaseAmount,
	increaseAmount,
	removeAllOrderProduct,
	removeOrderProduct,
	selectedOrder,
} from "../../redux/slides/orderSlide";
import { useEffect, useMemo, useState } from "react";
import { convertPrice } from "../../utils";
import * as UserService from "../../services/UserService";
import * as message from "../../components/Message/Message";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useNavigate } from "react-router-dom";
import StepComponent from "../../components/StepComponent/StepComponent";

const OrderPage = ({ count = 1 }) => {
	const order = useSelector((state) => {
		return state.order;
	});
	const user = useSelector((state) => {
		return state.user;
	});
	const [listChecked, setListChecked] = useState([]);
	const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
	const [stateUserDetails, setStateUserDetails] = useState({
		name: "",
		phone: "",
		address: "",
		city: "",
	});
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

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

	useEffect(() => {
		dispatch(selectedOrder({ listChecked }));
	}, [listChecked]);

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
		if (priceMemo >= 20000 && priceMemo < 500000) {
			return 10000;
		} else if (
			priceMemo >= 500000 ||
			order?.orderItemsSelected?.length === 0
		) {
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

	const handleRemoveAllOrder = () => {
		if (listChecked?.length > 1 || order?.orderItems?.length === 1) {
			dispatch(removeAllOrderProduct({ listChecked }));
			setListChecked([]);
		}
	};

	const handleAddCard = () => {
		if (!order?.orderItemsSelected?.length) {
			message.error("Vui lòng chọn sản phẩm");
		} else if (
			!user?.phone ||
			!user?.address ||
			!user?.name ||
			!user?.city
		) {
			setIsOpenModalUpdateInfo(true);
		} else {
			navigate("/payment");
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
	const { data, isPending } = mutationUpdated;

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

	const itemDelivery = [
		{
			title: "20000 VND",
			description: "Dưới 200.000 VND",
		},
		{
			title: "10.000 VND",
			description: "Từ 200.000 VND đến dưới 500.000 VND",
			subTitle: "Left 00:00:08",
		},
		{
			title: "0 VND",
			description: "trên 500.000 VND",
		},
	];

	return (
		<div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
			<div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
				<h3 style={{ fontSize: "1.8rem", marginTop: 0 }}>Giỏ hàng</h3>

				<div style={{ display: "flex", justifyContent: "center" }}>
					<WrapperLeft>
						<WrapperStyleHeaderDelivery>
							<StepComponent
								items={itemDelivery}
								current={
									order?.orderItemsSelected.length === 0
										? 0
										: deliveryPriceMemo === 10000
										? 2
										: deliveryPriceMemo === 20000
										? 1
										: 3
								}
							/>
						</WrapperStyleHeaderDelivery>

						<WrapperStyleHeader>
							<span
								style={{
									display: "inline-block",
									width: "390px",
								}}
							>
								<Checkbox
									checked={
										listChecked.length !== 0 &&
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
												src={order?.image}
												style={{
													width: "77px",
													height: "79px",
													objectFit: "cover",
													marginLeft: "10px",
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
													{convertPrice(order?.price)}
												</span>
											</span>

											<WrapperCountOrder>
												<button
													style={{
														border: "none",
														background:
															"transparent",
														cursor:
															order?.amount === 1
																? "default"
																: "pointer",
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
												{convertPrice(
													order?.price * order?.amount
												)}
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
							onClick={() => handleAddCard()}
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
							textButton={"Mua hàng"}
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
		</div>
	);
};

export default OrderPage;
