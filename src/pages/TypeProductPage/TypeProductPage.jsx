import { Col, Pagination, Row } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import { WrapperNavbar, WrapperProducts } from "./style";

const TypeProductPage = () => {
	const onChange = () => {};

	return (
		<div style={{ width: "100%", background: "#efefef" }}>
			<div style={{ width: "1270px", margin: "0 auto" }}>
				<Row
					style={{
						flexWrap: "nowrap",
						paddingTop: "10px",
					}}
				>
					<WrapperNavbar span={4}>
						<NavBarComponent />
					</WrapperNavbar>

					<Col span={20}>
						<WrapperProducts>
							<CardComponent price={1000} />
							<CardComponent price={1000} />
							<CardComponent price={1000} />
							<CardComponent price={1000} />
							<CardComponent price={1000} />
							<CardComponent price={1000} />
							<CardComponent price={1000} />
						</WrapperProducts>

						<Pagination
							defaultCurrent={2}
							total={100}
							onChange={onChange}
							style={{
								justifyContent: "center",
								marginTop: "10px",
							}}
						/>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default TypeProductPage;
