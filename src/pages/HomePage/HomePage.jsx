import SliderComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
	WrapperButtonMore,
	WrapperProducts,
	WrapperTypeProduct,
} from "./style";
import slider1 from "../../assets/imgs/slider1.webp";
import slider2 from "../../assets/imgs/slider2.webp";
import slider3 from "../../assets/imgs/slider3.webp";
import slider4 from "../../assets/imgs/slider4.webp";
import slider5 from "../../assets/imgs/slider5.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";

const HomePage = () => {
	const arr = ["TV", "Tu lanh", "Lap top"];

	const fetchProductsAll = async () => {
		const res = await ProductService.getAllProducts();
		return res;
	};

	const { isLoading, data: products } = useQuery({
		queryKey: ["products"],
		queryFn: fetchProductsAll,
		retry: 3,
		retryDelay: 1000,
	});
	console.log("data", products);

	return (
		<>
			<div style={{ width: "1270px", margin: "0 auto" }}>
				<WrapperTypeProduct>
					{arr.map((item) => {
						return <TypeProduct name={item} key={item} />;
					})}
				</WrapperTypeProduct>
			</div>

			<div
				className="body"
				style={{ width: "100%", backgroundColor: "#efefef" }}
			>
				<div
					id="container"
					style={{
						margin: "0 auto",
						width: "1270px",
						height: "1000px",
					}}
				>
					<SliderComponent
						arrImages={[
							slider1,
							slider2,
							slider3,
							slider4,
							slider5,
						]}
					/>

					<WrapperProducts>
						{products?.data?.map((product) => {
							return (
								<CardComponent
									key={product._id}
									countInStock={product.countInStock}
									description={product.description}
									image={product.image}
									name={product.name}
									price={product.price}
									rating={product.rating}
									type={product.type}
									sold={product.sold}
									discount={product.discount}
								/>
							);
						})}
					</WrapperProducts>

					<div
						style={{
							width: "100%",
							display: "flex",
							marginTop: "10px",
							justifyContent: "center",
						}}
					>
						<WrapperButtonMore
							textButton="Xem thêm"
							type="outline"
							styleButton={{
								border: "1px solid rgb(11, 116, 229)",
								color: "rgb(11, 116, 229)",
								height: "38px",
								width: "240px",
								borderRadius: "4px",
								fontWeight: "500",
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;
