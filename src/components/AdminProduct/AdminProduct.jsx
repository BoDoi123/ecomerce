import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import { WrapperFormItem, WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import * as ProductService from "../../services/ProductService";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useEffect, useState } from "react";
import { getBase64 } from "../../utils";
import Loading from "../LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";

const AdminProduct = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [stateProduct, setStateProduct] = useState({
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
	const { data, isSuccess, isError, isPending } = mutation;
	useEffect(() => {
		if (isSuccess && data?.status === "OK") {
			message.success();
			handleCancel();
		} else if (isError && data?.status === "ERR") {
			message.error();
		}
	}, [isSuccess]);

	const getAllProducts = async () => {
		const res = await ProductService.getAllProducts();

		return res;
	};

	const { isLoading: isLoadingProducts, data: products } = useQuery({
		queryKey: ["products"],
		queryFn: getAllProducts,
	});

	const renderAction = () => {
		return (
			<div>
				<DeleteOutlined
					style={{
						color: "red",
						fontSize: "30px",
						cursor: "pointer",
					}}
				/>
				<EditOutlined
					style={{
						color: "orange",
						fontSize: "30px",
						cursor: "pointer",
					}}
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
		mutation.mutate(stateProduct);
	};

	const handleOnChange = (e) => {
		setStateProduct({
			...stateProduct,
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
				/>
			</div>

			<Modal
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
			</Modal>
		</div>
	);
};

export default AdminProduct;
