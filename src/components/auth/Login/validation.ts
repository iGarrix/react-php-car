import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Не коректно вказана пошта")
    .required("Вкажіть пошту"),

  password: Yup.string()
      .required('Вкажіть пароль.')
      .min(6),
});