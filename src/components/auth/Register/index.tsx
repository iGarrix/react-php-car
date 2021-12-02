import { FC, useState } from 'react';
import {useNavigate} from 'react-router';
import {IRegisterModel, ServerRegisterError} from './types';
import InputGroup from "../../common/InputGroup";
import {useActions} from "../../../hooks/useActions";

const RegisterPage : FC = () => {

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false); 

  const navigator = useNavigate();

  const initialState : IRegisterModel = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  }
  const initialErrors : ServerRegisterError = {
    name: [],
    email:[],
    password: [],
    password_confirmation: [],
    error: ""
  }

  const [state, setState] = useState<IRegisterModel>(initialState);

  const [serverErrors, setServerErrors] = useState<ServerRegisterError>(initialErrors);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const {registerUser} = useActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      console.log("Register begin");
      await registerUser(state);
      console.log("Register end");
      setIsSubmitted(false);
      navigator("/");

    }
    catch(ex) {
      const serverErrors = ex as ServerRegisterError;
      setServerErrors(serverErrors);
      console.log("Register problem", serverErrors);
      setIsSubmitted(false);
    }
  }

  return (
    <>
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h1 className="text-center">Регестрація на сайті</h1>
        <form onSubmit={handleSubmit}>
          {isSubmitted && <h3>Loading ...</h3>}
          {!!serverErrors.error && 
          <div className="alert alert-danger" role="alert">
            {serverErrors.error}
          </div> }

          <InputGroup 
            label="Ім'я"
            field="name"
            value={state.name}
            errors={serverErrors.name}
            onChange={handleChange}
          />
          <InputGroup 
            label="Електронна пошта"
            field="email"
            value={state.email}
            errors={serverErrors.email}
            onChange={handleChange}
          />
          <InputGroup 
            label="Пароль"
            field="password"
            value={state.password}
            errors={serverErrors.password}
            onChange={handleChange}
          />
          <InputGroup 
            label="Повторний пароль"
            field="password_confirmation"
            value={state.password_confirmation}
            errors={serverErrors.password_confirmation}
            onChange={handleChange}
          />

          <button type="submit" 
            className="btn btn-primary"
            disabled={isSubmitted}>
            Вхід
          </button>
        </form>
      </div>
    </div>
  </>
  );
};

export default RegisterPage;
