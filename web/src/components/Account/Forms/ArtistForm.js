import { DynamicFields, UploadField } from "components/FormFields";

import { Button, Form } from "antd";

export const ArtistForm = ({ artist = {}, onSubmit }) => (
  <Form onFinish={onSubmit} initialValues={artist}>
    <DynamicFields fields={fields} />
    <UploadField field={featuredImage} />
    <UploadField field={galleryImages} />
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  </Form>
);

const types = [
  { value: "painting", display: "Painting" },
  { value: "sculpture", display: "Sculpture" },
  { value: "photography", display: "Photography" },
];

const fields = {
  // type: {
  //   label: "Medium",
  //   options: types,
  //   type: "select",
  //   placeholder: "Choose one",
  // },
  firstname: {
    label: "First Name",
    required: true,
    type: "text",
  },
  lastname: {
    label: "Last Name",
    required: true,
    type: "text",
  },
  email: {
    type: "text",
    required: true,
  },
  phone: {
    type: "text",
  },
  urlExternal: {
    label: "Website",
    type: "text",
  },
  bio: {
    required: true,
    type: "textarea",
  },
};

const galleryImages = {
  accept: "image/png, image/jpeg",
  key: "galleryImages",
  label: "Gallery Images",
  showUploadList: true,
};

const featuredImage = {
  key: "featuredImage",
  label: "Featured Image",
  accept: "image/png, image/jpeg",
};
