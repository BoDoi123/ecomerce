import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
	padding: 12px 120px;
	background-color: rgb(26, 148, 255);
	align-items: center;
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
`;

export const WrapperTextHeaderCart = styled.span`
	color: #fff;
	font-size: 12px;
`;
