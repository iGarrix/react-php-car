import { FC, useState } from 'react';
import {useNavigate} from 'react-router';
import {IRegisterModel, ServerRegisterError} from './types';
import InputGroup from "../../common/InputGroup";
import {useActions} from "../../../hooks/useActions";
import { useFormik, Form, FormikProvider, FormikHelpers } from "formik";
import {LoginSchema} from './validation';

const RegisterPage : FC = () => {

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false); 

  const navigate = useNavigate();
  const {registerUser} = useActions();

  const initialState: IRegisterModel = { 
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const initialErrors: ServerRegisterError = { 
    name: [],
    email: [],
    password: [],
    password_confirmation: [],
    error: "",
  };

  const [serverErrors, setServerErrors] = useState<ServerRegisterError>(initialErrors);

  const onHandleSubmit = async (values: IRegisterModel, 
    {setFieldError} : FormikHelpers<IRegisterModel>) => {

      setIsSubmitted(true);
       try {
           await registerUser(values);
           console.log("submit form", values);
           setIsSubmitted(false);

           setTimeout(() => {navigate("/")}, 1000)
       }
       catch(ex) {
        const serverErrors = ex as ServerRegisterError;
        setServerErrors(serverErrors);
        if (serverErrors.email === undefined) {
          setServerErrors(prev => {return {...prev, error: "Error register"}});
        }
        if (serverErrors.email && serverErrors.email.length != 0) {
          setFieldError("email", serverErrors.email[0]);
        }
        if (serverErrors.password && serverErrors.password.length != 0) {
          setFieldError("password", serverErrors.password[0]);
        }
        if (serverErrors.password_confirmation && serverErrors.password_confirmation.length != 0 || serverErrors.password_confirmation !== serverErrors.password) {
          setFieldError("confirm password", serverErrors.password_confirmation[0]);
        }
        setIsSubmitted(false);
      }   
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: LoginSchema,
    onSubmit: onHandleSubmit,
  });

  const { errors, touched, handleChange, handleSubmit, setFieldError } = formik;

return (
<>
<div className="row">
  <div className="col-md-6 offset-md-3">
    <h1 className="text-center">Регестрація на сайті</h1>
    {serverErrors.error && (
      <div className="alert alert-danger" role="alert">
        {serverErrors.error}
      </div>
    )}
    <FormikProvider value={formik} >
        <Form onSubmit={handleSubmit}>
          <InputGroup
            label="Імя"
            field="name"
            error={errors.name}
            touched={touched.name}
            onChange={handleChange}
          />
          <InputGroup
            label="Пошта"
            field="email"
            type="email"
            error={errors.email}
            touched={touched.email}
            onChange={handleChange}
          />

          <InputGroup
            label="Пароль"
            field="password"
            type="password"
            error={errors.password}
            touched={touched.password}
            onChange={handleChange}
          />
          <InputGroup
            label="Повторіть пароль"
            field="password_confirmation"
            type="password"
            error={errors.password_confirmation}
            touched={touched.password_confirmation}
            onChange={handleChange}
          />
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-info px-5"
              disabled={isSubmitted}
            >
              Регестрація
            </button>
          </div>
        </Form>
    </FormikProvider>
  </div>
</div>
</>
);
}

export default RegisterPage;
