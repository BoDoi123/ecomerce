import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
	height: 64px;
	width: 64px;
`;

export const WrapperStyleColImage = styled(Col)`
	flex-basis: unset;
	display: flex;
`;

export const WrapperStyleNameProduct = styled.h1`
	color: rgb(36, 36, 36);
	font-size: 2.4rem;
	font-weight: 300;
	line-height: 32px;
	word-break: break-word;
	margin: 0;
`;

export const WrapperStyleTextSell = styled.span`
	font-size: 1.5rem;
	line-height: 24px;
	color: rgb(120, 120, 120);
`;

export const WrapperPriceProduct = styled.div`
	background: rgb(250, 250, 250);
	border-radius: 4px;
`;

export const WrapperPriceTextProduct = styled.h1`
	font-size: 3.2rem;
	line-height: 40px;
	font-weight: 500;
	padding: 10px;
	margin: 0;
	margin-right: 8px;
	margin-top: 10px;
`;

export const WrapperAddressTextProduct = styled.div`
	span.address {
		text-decoration: underline;
		font-size: 1.5rem;
		line-height: 24px;
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	span.change-address {
		color: rgb(11, 116, 229);
		font-size: 1.6rem;
		line-height: 24px;
		font-weight: 500;
	}
`;

export const WrapperQuantityProduct = styled.div`
	display: flex;
	align-items: center;
	border-radius: 4px;
	width: 120px;
	border: 1px solid #ccc;
`;

export const WrapperInputNumber = styled(InputNumber)`
	&.ant-input-number.ant-input-number-outlined {
		width: 60px;
		border-top: none;
		border-bottom: none;
		border-radius: 0;
	}

	& input.ant-input-number-input {
		text-align: center;
	}

	& .ant-input-number-handler-wrap {
		display: none;
	}
`;
