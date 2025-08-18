import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import { Table } from "antd";
import Loading from "../LoadingComponent/Loading";
import { useState } from "react";

const TableComponent = (props) => {
	const {
		selectionType = "checkbox",
		data = [],
		isLoading = false,
		columns = [],
		handleDeleteMany,
	} = props;
	const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

	const rowSelection = {
		onChange: (selectedRowKeys) => {
			setRowSelectedKeys(selectedRowKeys);
		},
		// getCheckboxProps: (record) => ({
		// 	disabled: record.name === "Disbaled User",
		// 	name: record.name,
		// }),
	};

	const handleDeleteAll = () => {
		handleDeleteMany(rowSelectedKeys);
	};

	return (
		<Loading isLoading={isLoading}>
			{rowSelectedKeys.length > 0 && (
				<div
					style={{
						background: "#1d1ddd",
						color: "#fff",
						fontWeight: "bold",
						padding: "10px",
						fontSize: "1.4rem",
						cursor: "pointer",
					}}
					onClick={handleDeleteAll}
				>
					Xóa tất cả
				</div>
			)}

			<Table
				rowSelection={{ type: selectionType, ...rowSelection }}
				columns={columns}
				dataSource={data}
				{...props}
			/>
		</Loading>
	);
};

export default TableComponent;
