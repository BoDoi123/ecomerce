import { createRoot } from "react-dom/client";
import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	WarningOutlined,
} from "@ant-design/icons";
import {
	MessageWrapper,
	MessageContent,
	MessageText,
	MessageIcon,
} from "./style";

const showMessage = (type, content, duration = 3000) => {
	const div = document.createElement("div");
	document.body.appendChild(div);
	const root = createRoot(div);

	const icon = {
		success: <CheckCircleOutlined />,
		error: <CloseCircleOutlined />,
		warning: <WarningOutlined />,
	}[type];

	root.render(
		<MessageWrapper>
			<MessageContent type={type}>
				<MessageIcon type={type}>{icon}</MessageIcon>
				<MessageText>{content}</MessageText>
			</MessageContent>
		</MessageWrapper>
	);

	setTimeout(() => {
		div.style.animation = "slideOut 0.3s ease forwards";
		setTimeout(() => {
			root.unmount();
			document.body.removeChild(div);
		}, 300);
	}, duration);
};

const success = (mes = "Success") => showMessage("success", mes);
const error = (mes = "Error") => showMessage("error", mes);
const warning = (mes = "Warning") => showMessage("warning", mes);

export { success, error, warning };
