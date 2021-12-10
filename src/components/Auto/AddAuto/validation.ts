import * as Yup from "yup";

export const LoginSchema = Yup.object({
  name: Yup.string()
    .required("Вкажіть назву"),
    details: Yup.string()
    .required("Вкажіть деталі"),
});