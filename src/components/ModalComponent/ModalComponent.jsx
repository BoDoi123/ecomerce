import { Modal } from "antd";

const ModalComponent = ({
	title = "Modal",
	isOpen = false,
	children,
	...rests
}) => {
	return (
		<Modal
			title={title}
			closable={{ "aria-label": "Custom Close Button" }}
			open={isOpen}
			{...rests}
		>
			{children}
		</Modal>
	);
};

export default ModalComponent;
