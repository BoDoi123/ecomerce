import { Table } from "antd";
import Loading from "../LoadingComponent/Loading";
import { useEffect, useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";

const TableComponent = (props) => {
	const {
		selectionType = "checkbox",
		data = [],
		isLoading = false,
		columns = [],
		handleDeleteMany,
	} = props;
	const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
	const tableRef = useRef(null);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		// Đảm bảo table ref đã được khởi tạo
		if (tableRef.current) {
			setIsReady(true);
		}
	}, [tableRef.current]);

	const rowSelection = {
		onChange: (selectedRowKeys) => {
			setRowSelectedKeys(selectedRowKeys);
		},
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

			{isReady && (
				<DownloadTableExcel
					filename="table data"
					sheet="data"
					currentTableRef={tableRef.current}
				>
					<button>Export excel</button>
				</DownloadTableExcel>
			)}

			<table ref={tableRef} style={{ display: "none" }}>
				<thead>
					<tr>
						{columns.map((column) => (
							<th key={column.key || column.dataIndex}>
								{column.title}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data?.map((record, index) => (
						<tr key={record.key || index}>
							{columns.map((column) => (
								<td key={column.key || column.dataIndex}>
									{record[column.dataIndex]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>

			<Table
				rowSelection={{
					type: selectionType,
					...rowSelection,
				}}
				columns={columns}
				dataSource={data}
				{...props}
			/>
		</Loading>
	);
};

export default TableComponent;
