import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import { WrapperFormItem, WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import * as ProductService from "../../services/ProductService";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useEffect, useState } from "react";
import { getBase64 } from "../../utils";
import Loading from "../LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";

const AdminProduct = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rowSelected, setRowSelected] = useState("");
	const [isOpenDrawer, setIsOpenDrawer] = useState(false);
	const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
	const user = useSelector((state) => state?.user);
	const [stateProduct, setStateProduct] = useState({
		name: "",
		price: "",
		description: "",
		rating: "",
		image: "",
		type: "",
		countInStock: "",
	});
	const [stateProductDetails, setStateProductDetails] = useState({
		name: "",
		price: "",
		description: "",
		rating: "",
		image: "",
		type: "",
		countInStock: "",
	});
	const [form] = Form.useForm();

	const mutation = useMutationHook(async (data) => {
		const {
			name,
			price,
			description,
			rating,
			image,
			type,
			countInStock: countInStock,
		} = data;
		const res = await ProductService.createProduct({
			name,
			price,
			description,
			rating,
			image,
			type,
			countInStock,
		});
		return res;
	});
	const { data, isPending } = mutation;

	const mutationUpdated = useMutationHook(async (data) => {
		const { id, access_token, stateProductDetails } = data;
		const res = await ProductService.updateProduct({
			id,
			access_token,
			data: stateProductDetails,
		});
		return res;
	});
	const { data: dataUpdated, isPending: isLoadingUpdated } = mutationUpdated;

	const mutationDeleted = useMutationHook(async (data) => {
		const { id, access_token } = data;
		const res = await ProductService.deleteProduct({
			id,
			access_token,
		});
		return res;
	});
	const { data: dataDeleted, isPending: isLoadingDeleted } = mutationDeleted;

	useEffect(() => {
		if (data?.status === "OK") {
			message.success();
			handleCancel();
		} else if (data?.status === "ERR") {
			message.error();
		}
	}, [isPending]);

	useEffect(() => {
		if (dataDeleted?.status === "OK") {
			message.success();
			handleCancelDelete();
		} else if (dataDeleted?.status === "ERR") {
			message.error();
		}
	}, [isLoadingDeleted]);

	useEffect(() => {
		if (dataUpdated?.status === "OK") {
			message.success();
			handleCloseDrawer();
		} else if (dataUpdated?.status === "ERR") {
			message.error();
		}
	}, [isLoadingUpdated]);

	const handleCancelDelete = () => {
		setIsModalOpenDelete(false);
	};

	const handleDeleteProduct = () => {
		mutationDeleted.mutate(
			{
				id: rowSelected,
				access_token: user?.access_token,
			},
			{
				onSettled: () => {
					queryProduct.refetch();
				},
			}
		);
	};

	const handleCloseDrawer = () => {
		setIsOpenDrawer(false);
		setStateProductDetails({
			name: "",
			price: "",
			description: "",
			rating: "",
			image: "",
			type: "",
			countInStock: "",
		});
		form.resetFields();
	};

	const getAllProducts = async () => {
		const res = await ProductService.getAllProducts();

		return res;
	};

	const fetchProductDetails = async () => {
		const res = await ProductService.getDetailsProduct(rowSelected);

		if (res?.data) {
			setStateProductDetails({
				name: res?.data.name,
				price: res?.data.price,
				description: res?.data.description,
				rating: res?.data.rating,
				image: res?.data.image,
				type: res?.data.type,
				countInStock: res?.data.countInStock,
			});
		}

		setIsLoadingUpdate(false);
	};

	useEffect(() => {
		form.setFieldsValue(stateProductDetails);
	}, [form, stateProductDetails]);

	useEffect(() => {
		if (rowSelected) {
			setIsLoadingUpdate(true);
			fetchProductDetails(rowSelected);
		}
	}, [rowSelected]);

	const handleDetailsProduct = () => {
		setIsOpenDrawer(true);
	};

	const queryProduct = useQuery({
		queryKey: ["products"],
		queryFn: getAllProducts,
	});
	const { isLoading: isLoadingProducts, data: products } = queryProduct;

	const renderAction = () => {
		return (
			<div>
				<DeleteOutlined
					style={{
						color: "red",
						fontSize: "30px",
						cursor: "pointer",
					}}
					onClick={() => setIsModalOpenDelete(true)}
				/>
				<EditOutlined
					style={{
						color: "orange",
						fontSize: "30px",
						cursor: "pointer",
					}}
					onClick={handleDetailsProduct}
				/>
			</div>
		);
	};
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			render: (text) => <a>{text}</a>,
		},
		{
			title: "Price",
			dataIndex: "price",
		},
		{
			title: "Rating",
			dataIndex: "rating",
		},
		{
			title: "Type",
			dataIndex: "type",
		},
		{
			title: "Action",
			dataIndex: "action",
			render: renderAction,
		},
	];
	const dataTable =
		products?.data.length &&
		products?.data.map((product) => {
			return { ...product, key: product._id };
		});

	const handleCancel = () => {
		setIsModalOpen(false);
		setStateProduct({
			name: "",
			price: "",
			description: "",
			rating: "",
			image: "",
			type: "",
			countInStock: "",
		});
		form.resetFields();
	};

	const onFinish = () => {
		mutation.mutate(stateProduct, {
			onSettled: () => {
				queryProduct.refetch();
			},
		});
	};

	const handleOnChange = (e) => {
		setStateProduct({
			...stateProduct,
			[e.target.name]: e.target.value,
		});
	};

	const handleOnChangeDetails = (e) => {
		setStateProductDetails({
			...stateProductDetails,
			[e.target.name]: e.target.value,
		});
	};

	const handleOnChangeAvatar = async ({ fileList }) => {
		const file = fileList[0];

		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		setStateProduct({
			...stateProduct,
			image: file.preview,
		});
	};

	const handleOnChangeAvatarDetails = async ({ fileList }) => {
		const file = fileList[0];

		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		setStateProductDetails({
			...stateProductDetails,
			image: file.preview,
		});
	};

	const onUpdateProduct = () => {
		mutationUpdated.mutate(
			{
				id: rowSelected,
				access_token: user?.access_token,
				stateProductDetails,
			},
			{
				onSettled: () => {
					queryProduct.refetch();
				},
			}
		);
	};

	return (
		<div>
			<WrapperHeader>Quản lý sản phẩm</WrapperHeader>
			<div style={{ marginTop: "10px" }}>
				<Button
					style={{
						height: "150px",
						width: "150px",
						borderRadius: "6px",
						borderStyle: "dashed",
					}}
					onClick={() => setIsModalOpen(true)}
				>
					<PlusOutlined style={{ fontSize: "60px" }} />
				</Button>
			</div>

			<div style={{ marginTop: "20px" }}>
				<TableComponent
					columns={columns}
					isLoading={isLoadingProducts}
					data={dataTable}
					onRow={(record, rowIndex) => {
						return {
							onClick: (event) => {
								setRowSelected(record._id);
							},
						};
					}}
				/>
			</div>

			<ModalComponent
				title="Tạo sản phẩm"
				closable={{ "aria-label": "Custom Close Button" }}
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
			>
				<Loading isLoading={isPending}>
					<Form
						name="basic"
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 18 }}
						style={{ maxWidth: 600 }}
						onFinish={onFinish}
						autoComplete="on"
						form={form}
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
								value={stateProduct.name}
								onChange={handleOnChange}
								name="name"
							/>
						</Form.Item>

						{/* Type */}
						<Form.Item
							label="Type"
							name="type"
							rules={[
								{
									required: true,
									message: "Please input your type!",
								},
							]}
						>
							<InputComponent
								value={stateProduct.type}
								onChange={handleOnChange}
								name="type"
							/>
						</Form.Item>

						{/* CCount in Stock */}
						<Form.Item
							label="Count inStock"
							name="countInStock"
							rules={[
								{
									required: true,
									message: "Please input your count inStock!",
								},
							]}
						>
							<InputComponent
								value={stateProduct.countInStock}
								onChange={handleOnChange}
								name="countInStock"
							/>
						</Form.Item>

						{/* Price */}
						<Form.Item
							label="Price"
							name="price"
							rules={[
								{
									required: true,
									message: "Please input your price!",
								},
							]}
						>
							<InputComponent
								value={stateProduct.price}
								onChange={handleOnChange}
								name="price"
							/>
						</Form.Item>

						{/* Rating */}
						<Form.Item
							label="Rating"
							name="rating"
							rules={[
								{
									required: true,
									message: "Please input your rating!",
								},
							]}
						>
							<InputComponent
								value={stateProduct.rating}
								onChange={handleOnChange}
								name="rating"
							/>
						</Form.Item>

						{/* Description */}
						<Form.Item
							label="Description"
							name="description"
							rules={[
								{
									required: true,
									message: "Please input your description!",
								},
							]}
						>
							<InputComponent
								value={stateProduct.description}
								onChange={handleOnChange}
								name="description"
							/>
						</Form.Item>

						{/* Image */}
						<WrapperFormItem
							label="Image"
							name="image"
							rules={[
								{
									required: true,
									message: "Please input your image!",
								},
							]}
						>
							<WrapperUploadFile
								maxCount={1}
								onChange={handleOnChangeAvatar}
							>
								<Button style={{ display: "block" }}>
									Select File
								</Button>

								{stateProduct?.image && (
									<img
										src={stateProduct?.image}
										style={{
											height: "60px",
											width: "60px",
											borderRadius: "50%",
											objectFit: "cover",
											marginLeft: "10px",
										}}
										alt="avatar"
									/>
								)}
							</WrapperUploadFile>
						</WrapperFormItem>

						<Form.Item
							label={null}
							wrapperCol={{ offset: 20, span: 16 }}
						>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Loading>
			</ModalComponent>

			<DrawerComponent
				title="Chi tiết sản phẩm"
				isOpen={isOpenDrawer}
				onClose={() => setIsOpenDrawer(false)}
				width="90%"
			>
				<Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
					<Form
						name="basic"
						labelCol={{ span: 2 }}
						wrapperCol={{ span: 22 }}
						// style={{ maxWidth: 600 }}
						onFinish={onUpdateProduct}
						autoComplete="on"
						form={form}
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
								value={stateProductDetails.name}
								onChange={handleOnChangeDetails}
								name="name"
							/>
						</Form.Item>

						{/* Type */}
						<Form.Item
							label="Type"
							name="type"
							rules={[
								{
									required: true,
									message: "Please input your type!",
								},
							]}
						>
							<InputComponent
								value={stateProductDetails.type}
								onChange={handleOnChangeDetails}
								name="type"
							/>
						</Form.Item>

						{/* CCount in Stock */}
						<Form.Item
							label="Count inStock"
							name="countInStock"
							rules={[
								{
									required: true,
									message: "Please input your count inStock!",
								},
							]}
						>
							<InputComponent
								value={stateProductDetails.countInStock}
								onChange={handleOnChangeDetails}
								name="countInStock"
							/>
						</Form.Item>

						{/* Price */}
						<Form.Item
							label="Price"
							name="price"
							rules={[
								{
									required: true,
									message: "Please input your price!",
								},
							]}
						>
							<InputComponent
								value={stateProductDetails.price}
								onChange={handleOnChangeDetails}
								name="price"
							/>
						</Form.Item>

						{/* Rating */}
						<Form.Item
							label="Rating"
							name="rating"
							rules={[
								{
									required: true,
									message: "Please input your rating!",
								},
							]}
						>
							<InputComponent
								value={stateProductDetails.rating}
								onChange={handleOnChangeDetails}
								name="rating"
							/>
						</Form.Item>

						{/* Description */}
						<Form.Item
							label="Description"
							name="description"
							rules={[
								{
									required: true,
									message: "Please input your description!",
								},
							]}
						>
							<InputComponent
								value={stateProductDetails.description}
								onChange={handleOnChangeDetails}
								name="description"
							/>
						</Form.Item>

						{/* Image */}
						<WrapperFormItem
							label="Image"
							name="image"
							rules={[
								{
									required: true,
									message: "Please input your image!",
								},
							]}
						>
							<WrapperUploadFile
								maxCount={1}
								onChange={handleOnChangeAvatarDetails}
							>
								<Button style={{ display: "block" }}>
									Select File
								</Button>

								{stateProductDetails?.image && (
									<img
										src={stateProductDetails?.image}
										style={{
											height: "60px",
											width: "60px",
											borderRadius: "50%",
											objectFit: "cover",
											marginLeft: "10px",
										}}
										alt="avatar"
									/>
								)}
							</WrapperUploadFile>
						</WrapperFormItem>

						<Form.Item
							label={null}
							wrapperCol={{ offset: 20, span: 16 }}
						>
							<Button type="primary" htmlType="submit">
								Apply
							</Button>
						</Form.Item>
					</Form>
				</Loading>
			</DrawerComponent>

			<ModalComponent
				title="Xóa sản phẩm"
				closable={{ "aria-label": "Custom Close Button" }}
				open={isModalOpenDelete}
				onCancel={handleCancelDelete}
				onOk={handleDeleteProduct}
			>
				<Loading isLoading={isPending}>
					<div>Bạn có chắc xóa sản phẩm này không?</div>
				</Loading>
			</ModalComponent>
		</div>
	);
};

export default AdminProduct;
