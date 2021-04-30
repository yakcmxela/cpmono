import { Form, Input } from "antd";

export const AddressFieldGroup = () => (
  <Form.Item>
    {Object.keys(ADDRESS_FIELDS).map((key) => (
      <Form.Item key={key} name={["address", key]} label={ADDRESS_FIELDS[key]}>
        <Input />
      </Form.Item>
    ))}
  </Form.Item>
);

const ADDRESS_FIELDS = {
  street1: "Address",
  street2: "Apt/Suite",
  city: "City",
  state: "State",
  postcode: "Zip",
};
