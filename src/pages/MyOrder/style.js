import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
	background: rgb(255, 255, 255);
	padding: 9px 16px;
	border-radius: 4px;
	display: flex;
	align-items: center;
	span {
		color: rgb(36, 36, 36);
		font-weight: 400;
		font-size: 1.6rem;
	}
`;

export const WrapperHeaderItem = styled.div`
	width: 100%;
	display: flex;
	margin: 10px 0 10px;
	align-items: center;
`;

export const WrapperFooterItem = styled.div`
	margin-top: 12px;
	display: flex;
	flex-direction: column;
	width: 100%;
	text-align: right;
	gap: 10px;
	border-top: 1px solid rgb(235, 235, 240);
`;

export const WrapperStatus = styled.div`
	display: flex;
	align-item: flex-start;
	width: 100%;
	margin-bottom: 10px;
	padding-bottom: 10px;
	border-bottom: 1px solid rgb(235, 235, 240);
	flex-direction: column;
`;

export const WrapperContainer = styled.div`
	width: 1270px;
	height: 100%;
	margin: 0 auto;
`;

export const WrapperStyleHeaderDelivery = styled.div`
	background: rgb(255, 255, 255);
	padding: 9px 16px;
	border-radius: 4px;
	display: flex;
	align-items: center;
	span {
		color: rgb(36, 36, 36);
		font-weight: 400;
		font-size: 1.6rem;
	}
	margin-bottom: 4px;
`;

export const WrapperLeft = styled.div`
	width: 910px;
`;

export const WrapperListOrder = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding-top: 20px;
`;

export const WrapperItemOrder = styled.div`
	display: flex;
	align-items: center;
	padding: 9px 16px;
	background: #fff;
	margin-top: 12px;
	flex-direction: column;
	width: 950px;
	margin: 0 auto;
	background: #fff;
	border-radius: 6px;
	box-shadow: 0 12px 12px #ccc;
`;

export const WrapperPriceDiscount = styled.span`
	color: #999;
	font-size: 1.4rem;
	text-decoration: line-through;
	margin-left: 4px;
`;

export const WrapperCountOrder = styled.div`
	display: flex;
	align-items: center;
	width: 84px;
	border: 1px solid #ccc;
	border-radius: 4px;
`;

export const WrapperRight = styled.div`
	width: 320px;
	margin-left: 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: center;
`;

export const WrapperInfo = styled.div`
	padding: 17px 20px;
	border-bottom: 1px solid #f5f5f5;
	background: #fff;
	border-top-right-radius: 6px;
	border-top-left-radius: 6px;
`;

export const WrapperTotal = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	padding: 17px 20px;
	background: #fff;
	border-bottom-left-radius: 6px;
	border-bottom-right-radius: 6px;
`;
