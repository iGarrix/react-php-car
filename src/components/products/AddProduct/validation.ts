import * as Yup from "yup";

export const ProductSchema = Yup.object({
  name: Yup.string()
    .required("Вкажіть імя"),
  detail: Yup.string()
    .required("Вкажіть деталі"),
    file: Yup.string()
      .required('Виберіть картинку.'),
});