import { Form, Input, InputNumber, Select } from "antd";
import { capitalize } from "helpers";

export const DynamicFields = ({ fields }) => {
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
    }
  };

  return mapFields(fields);
};
