import { Form, Button, Input, InputNumber, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { capitalize } from "helpers";
import { UPLOAD_FILE } from "schema/mutations";
import { useMutation } from "@apollo/client";

export const DynamicForm = ({
  data,
  fields,
  onSubmit,
  submitText = "Submit",
}) => {
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
      return fileList.map((file) => file.response.data.upload.id)[0];
    }
  };

  const getProps = (field, key, parent) => {
    const { fileList, hidden, required, rules } = field;

    const name = parent ? [parent, key] : field.fields ? undefined : key;
    const label = !field.fields ? capitalize(field.label || key) : undefined;

    let itemProps = {
      ...(hidden && { hidden }),
      ...(label && { label }),
      ...(name && { name }),
      ...(required && { required }),
      ...(rules && { rules }),
      ...(fileList && { fileList }),
      key,
    };

    if (field.type === "upload") {
      itemProps = {
        ...itemProps,
        getValueFromEvent: formatValues,
      };
    }

    return itemProps;
  };

  const mapFields = (fields, parent) => {
    return Object.keys(fields).map((key) => {
      const field = fields[key];
      if (field.fields) {
        return (
          <Form.Item {...getProps(field, key, parent)}>
            {mapFields(field.fields, key)}
          </Form.Item>
        );
      }
      return getComponent(field, key, parent);
    });
  };

  const getComponent = (field, key, parent) => {
    switch (field.type) {
      case "text":
        return (
          <Form.Item {...getProps(field, key, parent)}>
            <Input />
          </Form.Item>
        );
      case "textarea":
        return (
          <Form.Item {...getProps(field, key, parent)}>
            <Input.TextArea />
          </Form.Item>
        );
      case "number":
        return (
          <Form.Item {...getProps(field, key, parent)}>
            <InputNumber />
          </Form.Item>
        );
      case "select":
        return (
          <Form.Item {...getProps(field, key, parent)}>
            <Select placeholder={field.placeholder || undefined}>
              {field.options.map((option) => (
                <Select.Option key={option.value}>
                  {option.label ? option.label : capitalize(option.value)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        );
      case "upload":
        const { accept, listType, showUploadList } = field;
        const uploadProps = {
          ...(accept && { accept }),
          ...(listType && { listType }),
          ...(showUploadList && { showUploadList }),
        };
        return (
          <Form.Item {...getProps(field, key)}>
            <Upload {...uploadProps} customRequest={onUpload}>
              <div>
                <PlusOutlined /> <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        );
    }
  };

  return (
    <Form onFinish={onSubmit} initialValues={data}>
      {mapFields(fields)}
      <Button type="primary" htmlType="submit">
        {submitText}
      </Button>
    </Form>
  );
};
