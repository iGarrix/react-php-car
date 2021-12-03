import * as Yup from "yup";

export const LoginSchema = Yup.object({
  name: Yup.string()
    .required("Вкажіть імя"),
  email: Yup.string()
    .email("Не коректно вказана пошта")
    .required("Вкажіть пошту"),
  password: Yup.string()
      .required('Вкажіть пароль.')
      .min(6),
  password_confirmation: Yup.string()
      .required('Вкажіть повторно пароль.')
      .min(6)
      .oneOf([Yup.ref('password'), null], 'Невірно вказаний пароль')
});