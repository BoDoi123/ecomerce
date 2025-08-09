import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;
	justify-content: flex-start;
	font-size: 1.6rem;
	border-bottom: 1px solid red;
	height: 44px;
`;

export const WrapperButtonMore = styled(ButtonComponent)`
	&:hover {
		background: rgb(13, 92, 182);
		span {
			color: #fff;
		}
	}

	width: 100%;
	text-align: center;
`;

export const WrapperProducts = styled.div`
	display: flex;
	justify-content: center;
	gap: 15px;
	margin-top: 20px;
	flex-wrap: wrap;
`;
