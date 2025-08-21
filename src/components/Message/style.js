import styled from "styled-components";

export const MessageWrapper = styled.div`
	position: fixed;
	top: 20px;
	right: 20px;
	z-index: 1000;
	animation: slideIn 0.3s ease;
	cursor: pointer;

	@keyframes slideIn {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
`;

export const MessageContent = styled.div`
	padding: 12px 24px;
	border-radius: 8px;
	display: flex;
	align-items: center;
	gap: 8px;
	min-width: 300px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	background-color: ${(props) => {
		switch (props.type) {
			case "success":
				return "#f6ffed";
			case "error":
				return "#fff2f0";
			case "warning":
				return "#fffbe6";
			default:
				return "#fff";
		}
	}};
	border: 1px solid
		${(props) => {
			switch (props.type) {
				case "success":
					return "#b7eb8f";
				case "error":
					return "#ffccc7";
				case "warning":
					return "#ffe58f";
				default:
					return "#d9d9d9";
			}
		}};
`;

export const MessageIcon = styled.span`
	font-size: 16px;
	color: ${(props) => {
		switch (props.type) {
			case "success":
				return "#52c41a";
			case "error":
				return "#ff4d4f";
			case "warning":
				return "#faad14";
			default:
				return "#000";
		}
	}};
`;

export const MessageText = styled.span`
	color: rgba(0, 0, 0, 0.85);
	font-size: 14px;
`;
