import { DynamicForm } from "components/Forms/DynamicForm";

export const ArtistForm = ({ artist = {}, onSubmit }) => (
  <DynamicForm fields={fields} onSubmit={onSubmit} data={artist} />
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
