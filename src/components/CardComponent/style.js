import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
	width: 200px;
	& img {
		height: 200px;
		width: 200px;
	}
`;

export const StyleNameProduct = styled.div`
	font-weight: 400;
	font-size: 1.2rem;
	line-height: 16px;
	color: rgb(56, 56, 61);
`;

export const WrapperReportText = styled.div`
	font-size: 1.2rem;
	color: rgb(128, 128, 137);
	display: flex;
	align-items: center;
	margin: 6px 0 0;
`;

export const WrapperPriceText = styled.div`
	color: rgb(255, 66, 78);
	font-size: 1.6rem;
	font-weight: 500;
`;

export const WrapperDiscountText = styled.span`
	color: rgb(255, 66, 78);
	font-size: 1.2rem;
	font-weight: 500;
`;

export const WrapperStyleTextSell = styled.span`
	font-size: 1.5rem;
	line-height: 24px;
	color: rgb(120, 120, 120);
`;
