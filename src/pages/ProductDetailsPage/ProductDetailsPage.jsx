import { useNavigate, useParams } from "react-router-dom";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";

const ProductDetailPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	return (
		<div
			style={{
				padding: "0 120px",
				background: "#efefef",
				height: "1000px",
			}}
		>
			<h5 style={{ fontSize: "1.4rem", fontWeight: "500", margin: "0" }}>
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
	);
};

export default ProductDetailPage;
