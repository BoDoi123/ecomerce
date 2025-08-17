import { Table } from "antd";
import Loading from "../LoadingComponent/Loading";


const TableComponent = (props) => {
	const {
		selectionType = "checkbox",
		data = [],
		isLoading = false,
		columns = [],
	} = props;

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {},
		getCheckboxProps: (record) => ({
			disabled: record.name === "Disbaled User",
			name: record.name,
		}),
	};

	return (
		<Loading isLoading={isLoading}>
			<Table
				rowSelection={{ type: selectionType, ...rowSelection }}
				columns={columns}
				dataSource={data}
			/>
		</Loading>
	);
};

export default TableComponent;
