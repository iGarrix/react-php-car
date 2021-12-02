import { FC, useState } from 'react';
import {useNavigate} from 'react-router';
import {ILoginModel, ServerLoginError} from './types';
import InputGroup from "../../common/InputGroup";
import {useActions} from "../../../hooks/useActions";

const LoginPage : FC = () => {

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false); 

  const navigator = useNavigate();

  const initialState : ILoginModel = {
    email: "",
    password: ""
  }
  const initialErrors : ServerLoginError = {
    email:[],
    password: [],
    error: ""
  }

  const [state, setState] = useState<ILoginModel>(initialState);

  const [serverErrors, setServerErrors] = useState<ServerLoginError>(initialErrors);

  const {loginUser} = useActions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      console.log("Login begin");
      await loginUser(state);
      console.log("Login end");
      setIsSubmitted(false);
      navigator("/");

    }
    catch(ex) {
      const serverErrors = ex as ServerLoginError;
      setServerErrors(serverErrors);
      console.log("Login problem", serverErrors);
      setIsSubmitted(false);
    }
  }

  return (
    <>
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h1 className="text-center">Вхід на сайті</h1>
        <form onSubmit={handleSubmit}>
          {isSubmitted && <h3>Loading ...</h3>}
          {!!serverErrors.error && 
          <div className="alert alert-danger" role="alert">
            {serverErrors.error}
          </div> }
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

export default LoginPage;
