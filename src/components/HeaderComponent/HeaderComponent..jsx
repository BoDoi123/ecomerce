import { Col } from "antd";
import {
	UserOutlined,
	CaretDownOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";
import {
	WrapperHeader,
	WrapperTextHeader,
	WrapperHeaderAccount,
	WrapperTextHeaderCart,
} from "./style";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";

const HeaderComponent = () => {
	return (
		<div>
			<WrapperHeader gutter={16}>
				<Col span={6}>
					<WrapperTextHeader>LAPTRINHTHATDE</WrapperTextHeader>
				</Col>
				<Col span={12}>
					<ButtonInputSearch
						size="large"
						placeholder="input search text"
						textButton="Tìm kiếm"
					/>
				</Col>
				<Col
					span={6}
					style={{
						display: "flex",
						gap: "20px",
						alignItems: "center",
					}}
				>
					<WrapperHeaderAccount>
						<UserOutlined style={{ fontSize: "30px" }} />
						<div>
							<span>Đăng nhập / Đăng ký</span>
							<div>
								<span>Tài khoản</span>
								<CaretDownOutlined />
							</div>
						</div>
					</WrapperHeaderAccount>

					<WrapperTextHeaderCart>
						<ShoppingCartOutlined style={{ fontSize: "30px" }} />
						<span>Giỏ hàng</span>
					</WrapperTextHeaderCart>
				</Col>
			</WrapperHeader>
		</div>
	);
};

export default HeaderComponent;
