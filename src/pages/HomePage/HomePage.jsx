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
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";

const HomePage = () => {
	const arr = ["TV", "Tu lanh", "Lap top"];

	return (
		<>
			<div style={{ padding: "0 120px" }}>
				<WrapperTypeProduct>
					{arr.map((item) => {
						return <TypeProduct name={item} key={item} />;
					})}
				</WrapperTypeProduct>
			</div>

			<div
				id="container"
				style={{
					backgroundColor: "#efefef",
					padding: "0 120px",
					height: "1000px",
				}}
			>
				<SliderComponent
					arrImages={[slider1, slider2, slider3, slider4, slider5]}
				/>

				<WrapperProducts>
					<CardComponent />
					<CardComponent />
					<CardComponent />
					<CardComponent />
					<CardComponent />
					<CardComponent />
					<CardComponent />
					<CardComponent />
				</WrapperProducts>

				<div
					style={{
						width: "100%",
						display: "flex",
						alignItems: "center",
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

				{/* <NavBarComponent /> */}
			</div>
		</>
	);
};

export default HomePage;
