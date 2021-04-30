import { Form, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UPLOAD_FILE } from "schema/mutations";
import { useMutation } from "@apollo/client";
import { capitalize } from "helpers";

export const UploadField = ({ field }) => {
  const {
    accept,
    fileList,
    key,
    label,
    listType,
    required,
    showUploadList,
  } = field;

  const [uploadMutation] = useMutation(UPLOAD_FILE);
  const onUpload = ({ file, onError, onSuccess }) =>
    uploadMutation({
      variables: {
        file,
      },
    })
      .then(onSuccess)
      .catch(onError);

  const formatValues = ({ file, fileList }) => {
    if (file.status === "done") {
      return fileList.map((file) => file.response.data.upload.id);
    }
  };

  const itemProps = {
    ...(fileList && { fileList }),
    ...(required && { required }),
    getValueFromEvent: formatValues,
    label: capitalize(label || key),
    name: key,
  };

  const uploadProps = {
    ...(accept && { accept }),
    ...(listType && { listType }),
    ...(showUploadList && { showUploadList }),
  };

  return (
    <Form.Item {...itemProps}>
      <Upload {...uploadProps} customRequest={onUpload}>
        <div>
          <PlusOutlined /> <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </Upload>
    </Form.Item>
  );
};
