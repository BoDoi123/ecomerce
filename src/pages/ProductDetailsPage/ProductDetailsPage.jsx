import { useNavigate, useParams } from "react-router-dom";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";

const ProductDetailPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	return (
		<div style={{ background: "#efefef", height: "100vh", width: "100%" }}>
			<div
				style={{
					margin: "0 auto",
					width: "1270px",
					height: "100%",
				}}
			>
				<h5
					style={{
						fontSize: "1.4rem",
						fontWeight: "500",
						marginTop: "0",
					}}
				>
					<span
						style={{ cursor: "pointer", fontWeight: "bold" }}
						onClick={() => navigate("/")}
					>
						Trang chủ
					</span>{" "}
					- Chi tiết sản phầm
				</h5>
				<ProductDetailsComponent idProduct={id} />
			</div>
		</div>
	);
};

export default ProductDetailPage;
