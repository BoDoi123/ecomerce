import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
	background-color: rgb(26, 148, 255);
	align-items: center;
	gap: 16px;
	flex-wrap: nowrap;
	width: 1270px;
	padding: 12px 0;
`;

export const WrapperTextHeader = styled.span`
	font-size: 18px;
	color: #fff;
	font-weight: bold;
	text-align: left;
`;

export const WrapperHeaderAccount = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	color: #fff;
	font-size: 12px;
	while-space: nowrap;
`;

export const WrapperTextHeaderCart = styled.span`
	color: #fff;
	font-size: 12px;
	while-space: nowrap;
`;

export const WrapperContentPopup = styled.p`
	cursor: pointer;
	&:hover {
		color: rgb(26, 148, 255);
	}
`;
