import {
	DeleteOutlined,
	EditOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Space } from "antd";
import { WrapperFormItem, WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useEffect, useRef, useState } from "react";
import { getBase64 } from "../../utils";
import Loading from "../LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";

const AdminUser = () => {
	const [rowSelected, setRowSelected] = useState("");
	const [isOpenDrawer, setIsOpenDrawer] = useState(false);
	const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
	const user = useSelector((state) => state?.user);
	const searchInput = useRef(null);

	const [stateUserDetails, setStateUserDetails] = useState({
		name: "",
		email: "",
		phone: "",
		isAdmin: false,
		avatar: "",
		address: "",
	});
	const [form] = Form.useForm();

	const mutationUpdated = useMutationHook(async (data) => {
		const { id, access_token, stateUserDetails } = data;
		const res = await UserService.updateUser({
			id,
			access_token,
			data: stateUserDetails,
		});
		return res;
	});
	const { data: dataUpdated, isPending: isLoadingUpdated } = mutationUpdated;

	const onUpdateUser = () => {
		mutationUpdated.mutate(
			{
				id: rowSelected,
				access_token: user?.access_token,
				stateUserDetails,
			},
			{
				onSettled: () => {
					queryUser.refetch();
				},
			}
		);
	};

	const mutationDeleted = useMutationHook(async (data) => {
		const { id, access_token } = data;
		const res = await UserService.deleteUser({
			id,
			access_token,
		});
		return res;
	});
	const { data: dataDeleted, isPending: isLoadingDeleted } = mutationDeleted;

	const handleDeleteUser = () => {
		mutationDeleted.mutate(
			{
				id: rowSelected,
				access_token: user?.access_token,
			},
			{
				onSettled: () => {
					queryUser.refetch();
				},
			}
		);
	};

	const mutationDeletedMany = useMutationHook(async (data) => {
		const { ids, access_token } = data;
		const res = await UserService.deleteManyUser({
			ids,
			access_token,
		});
		return res;
	});
	const { data: dataDeletedMany, isPending: isLoadingDeletedMany } =
		mutationDeletedMany;

	const handleDeleteManyUsers = (_ids) => {
		mutationDeletedMany.mutate(
			{
				ids: _ids,
				access_token: user?.access_token,
			},
			{
				onSettled: () => {
					queryUser.refetch();
				},
			}
		);
	};

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

	useEffect(() => {
		if (dataDeletedMany?.status === "OK") {
			message.success();
			handleCloseDrawer();
		} else if (dataDeletedMany?.status === "ERR") {
			message.error();
		}
	}, [isLoadingDeletedMany]);

	const handleCancelDelete = () => {
		setIsModalOpenDelete(false);
	};

	const handleCloseDrawer = () => {
		setIsOpenDrawer(false);
		setStateUserDetails({
			name: "",
			email: "",
			phone: "",
			isAdmin: false,
			avatar: "",
			address: "",
		});
		form.resetFields();
	};

	const getAllUsers = async () => {
		const res = await UserService.getAllUsers(user?.access_token);

		return res;
	};

	const fetchUserDetails = async () => {
		const res = await UserService.getDetailsUser(
			rowSelected,
			user?.access_token
		);

		if (res?.data) {
			setStateUserDetails({
				name: res?.data.name,
				email: res?.data.email,
				phone: res?.data.phone,
				isAdmin: res?.data.isAdmin,
				address: res?.data.address,
				avatar: res?.data.avatar,
			});
		}

		setIsLoadingUpdate(false);
	};

	useEffect(() => {
		form.setFieldsValue(stateUserDetails);
	}, [form, stateUserDetails]);

	useEffect(() => {
		if (rowSelected && isOpenDrawer) {
			setIsLoadingUpdate(true);
			fetchUserDetails(rowSelected);
		}
	}, [rowSelected, isOpenDrawer]);

	const handleDetailsUser = () => {
		setIsOpenDrawer(true);
	};

	const queryUser = useQuery({
		queryKey: ["user"],
		queryFn: getAllUsers,
	});
	const { isLoading: isLoadingUsers, data: users } = queryUser;

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
					onClick={handleDetailsUser}
				/>
			</div>
		);
	};

	const handleSearch = (confirm) => {
		confirm();
		// setSearchText(selectedKeys[0]);
		// setSearchedColumn(dataIndex);
	};
	const handleReset = (clearFilters) => {
		clearFilters();
		// setSearchText("");
	};

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
				<InputComponent
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(selectedKeys, confirm, dataIndex)
					}
					style={{ marginBottom: 8, display: "block" }}
					allowClear={false}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() =>
							handleSearch(selectedKeys, confirm, dataIndex)
						}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() =>
							clearFilters && handleReset(clearFilters)
						}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{ color: filtered ? "#1677ff" : undefined }}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes(value.toLowerCase()),
		filterDropdownProps: {
			onOpenChange(open) {
				if (open) {
					setTimeout(() => searchInput.current?.select(), 100);
				}
			},
		},
		// render: (text) =>
		// 	searchedColumn === dataIndex ? (
		// 		<Highlighter
		// 			highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
		// 			searchWords={[searchText]}
		// 			autoEscape
		// 			textToHighlight={text ? text.toString() : ""}
		// 		/>
		// 	) : (
		// 		text
		// 	),
	});

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			render: (text) => <a>{text}</a>,
			sorter: (a, b) => a.name.length - b.name.length,
			...getColumnSearchProps("name"),
		},
		{
			title: "Email",
			dataIndex: "email",
			sorter: (a, b) => a.email.length - b.email.length,
			...getColumnSearchProps("email"),
		},
		{
			title: "Address",
			dataIndex: "address",
			sorter: (a, b) => a.address.length - b.address.length,
			...getColumnSearchProps("address"),
		},
		{
			title: "Admin",
			dataIndex: "isAdmin",
			filters: [
				{
					text: "True",
					value: "true",
				},
				{
					text: "False",
					value: "false",
				},
			],
			onFilter: (value, record) => {
				if (value === "false") {
					return record.isAdmin === "FALSE";
				}

				return record.isAdmin === "TRUE";
			},
		},
		{
			title: "Phone",
			dataIndex: "phone",
			sorter: (a, b) => a.phone - b.phone,
			...getColumnSearchProps("phone"),
		},

		{
			title: "Action",
			dataIndex: "action",
			render: renderAction,
		},
	];
	const dataTable =
		users?.data.length &&
		users?.data.map((user) => {
			return {
				...user,
				key: user._id,
				isAdmin: user.isAdmin ? "TRUE" : "FALSE",
			};
		});

	const handleOnChangeDetails = (e) => {
		setStateUserDetails({
			...stateUserDetails,
			[e.target.name]: e.target.value,
		});
	};

	const handleOnChangeAvatarDetails = async ({ fileList }) => {
		const file = fileList[0];

		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		setStateUserDetails({
			...stateUserDetails,
			avatar: file.preview,
		});
	};

	return (
		<div>
			<WrapperHeader>Quản lý người dùng</WrapperHeader>

			<div style={{ marginTop: "20px" }}>
				<TableComponent
					handleDeleteMany={handleDeleteManyUsers}
					columns={columns}
					isLoading={isLoadingUsers}
					data={dataTable}
					onRow={(record) => {
						return {
							onClick: () => {
								setRowSelected(record._id);
							},
						};
					}}
				/>
			</div>

			<DrawerComponent
				title="Chi tiết người dùng"
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
						onFinish={onUpdateUser}
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
								value={stateUserDetails?.name}
								onChange={handleOnChangeDetails}
								name="name"
							/>
						</Form.Item>

						{/* Email */}
						<Form.Item
							label="Email"
							name="email"
							rules={[
								{
									required: true,
									message: "Please input your email!",
								},
							]}
						>
							<InputComponent
								value={stateUserDetails?.type}
								onChange={handleOnChangeDetails}
								name="email"
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
								value={stateUserDetails?.countInStock}
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
								value={stateUserDetails?.address}
								onChange={handleOnChangeDetails}
								name="address"
							/>
						</Form.Item>

						{/* Image */}
						<WrapperFormItem
							label="Avatar"
							name="avatar"
							rules={[
								{
									required: true,
									message: "Please input your avatar!",
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

								{stateUserDetails?.avatar && (
									<img
										src={stateUserDetails?.avatar}
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
				forceRender
				title="Xóa người dùng"
				closable={{ "aria-label": "Custom Close Button" }}
				open={isModalOpenDelete}
				onCancel={handleCancelDelete}
				onOk={handleDeleteUser}
			>
				<Loading isLoading={isLoadingDeleted}>
					<div>Bạn có chắc xóa tài khoản này không?</div>
				</Loading>
			</ModalComponent>
		</div>
	);
};

export default AdminUser;
