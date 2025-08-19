import { Col, Pagination, Row } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import Loading from "../../components/LoadingComponent/Loading";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useLocation } from "react-router";
import * as ProductService from "../../services/ProductService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const TypeProductPage = () => {
	const searchProduct = useSelector((state) => state?.product?.search);
	const searchDebounce = useDebounce(searchProduct, 500);
	const { state } = useLocation();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [paginate, setPaginate] = useState({
		page: 0,
		limit: 10,
		total: 1,
	});

	const onChange = (current, pageSize) => {
		setPaginate({
			...paginate,
			page: current - 1,
			limit: pageSize,
		});
	};

	const fetchProductType = async (type, page, limit) => {
		setLoading(true);
		const res = await ProductService.getAllProductsType(type, page, limit);

		if (res?.status === "OK") {
			setLoading(false);
			setProducts(res?.data);

			setPaginate({
				...paginate,
				total: res?.totalPage,
			});
		} else {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (state) {
			fetchProductType(state, paginate.page, paginate.limit);
		}
	}, [state, paginate.page, paginate.limit]);

	return (
		<Loading isLoading={loading}>
			<div
				style={{
					width: "100%",
					background: "#efefef",
					height: "calc(100vh - 64px)",
				}}
			>
				<div
					style={{
						width: "1270px",
						margin: "0 auto",
						height: "100%",
					}}
				>
					<Row
						style={{
							flexWrap: "nowrap",
							paddingTop: "10px",
							height: "calc(100% - 20px)",
						}}
					>
						<WrapperNavbar span={4}>
							<NavBarComponent />
						</WrapperNavbar>

						<Col
							span={20}
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
							}}
						>
							<WrapperProducts>
								{products
									?.filter((pro) => {
										if (searchDebounce === "") {
											return pro;
										} else if (
											pro?.name
												.toLowerCase()
												.includes(
													searchDebounce.toLocaleLowerCase()
												)
										) {
											return pro;
										}
									})
									?.map((data) => {
										return (
											<CardComponent
												key={data._id}
												countInStock={data.countInStock}
												description={data.description}
												image={data.image}
												name={data.name}
												price={data.price}
												rating={data.rating}
												type={data.type}
												sold={data.sold}
												discount={data.discount}
												id={data._id}
											/>
										);
									})}
							</WrapperProducts>

							<Pagination
								defaultCurrent={paginate?.page + 1}
								total={paginate?.total}
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
		</Loading>
	);
};

export default TypeProductPage;
