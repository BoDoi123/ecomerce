import { Form, Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
	color: #000;
	font-size: 1.4rem;
`;

export const WrapperFormItem = styled(Form.Item)`
	& .ant-form-item-label {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
`;

export const WrapperUploadFile = styled(Upload)`
	& .ant-upload.ant-upload-select.ant-upload-select-picture-card {
		width: 60px;
		width: 60px;
		border-radius: 50%;
	}

	& .ant-upload-list-item-container {
		display: none;
	}

	& .ant-upload {
		display: flex;
		align-items: center;
	}
`;
