import { FC, useState } from 'react';
import {useNavigate} from 'react-router';
import {ILoginModel, ServerLoginError} from './types';
import InputGroup from "../../common/InputGroup";
import {useActions} from "../../../hooks/useActions";
import { useFormik, Form, FormikProvider, FormikHelpers } from "formik";
import {LoginSchema} from './validation';


const LoginPage : FC = () => {

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false); 

  const navigator = useNavigate();
  const {loginUser} = useActions();

  const initialState : ILoginModel = {
    email: "",
    password: ""
  }
  const initialErrors : ServerLoginError = {
    email:[],
    password: [],
    error: ""
  }

  const [serverErrors, setServerErrors] = useState<ServerLoginError>(initialErrors);


  const onHandleSubmit = async (
    values: ILoginModel,
    { setFieldError }: FormikHelpers<ILoginModel>
  ) => {
    setIsSubmitted(true);
    try {
      console.log("Login begin");
      await loginUser(values);
      console.log("Login end");
      setIsSubmitted(false);

      setTimeout(() => {navigator("/");}, 1000);
      
    }
    catch(ex) {
      const serverErrors = ex as ServerLoginError;
      setServerErrors(serverErrors);
      if (serverErrors.password && serverErrors.password.length !== 0) {
        setFieldError("password", serverErrors.password[0]);
      }
      //console.log("Login problem", serverErrors);
      setIsSubmitted(false);
    }
  }

  
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
          <h1 className="text-center">Вхід на сайті</h1>
          {!!serverErrors.error && (
            <div className="alert alert-danger" role="alert">
              {serverErrors.error}
            </div>
          )}
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              {isSubmitted && <h3>Loading ...</h3>}

              <InputGroup
                label="Електронна пошта"
                field="email"
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

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitted}
              >
                Вхід
              </button>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
};

export default LoginPage;