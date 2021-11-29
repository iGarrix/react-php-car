import { FC, useState } from 'react';
import {ILoginModel} from '../../../store/action-creators/auth';
import InputGroup from "../../common/InputGroup";
import {useActions} from "../../../hooks/useActions";

const LoginPage : FC = () => {

  const initialState : ILoginModel = {
    email: "",
    password: ""
  }

  const [state, setState] = useState(initialState);

  const {loginUser} = useActions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(state);
    
    //console.log("submit form", state);
  }

  return (
    <>
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h1 className="text-center">Вхід на сайті</h1>
        <form onSubmit={handleSubmit}>
          <InputGroup 
            label="Електронна пошта"
            field="email"
            value={state.email}
            onChange={handleChange}
          />

          <InputGroup 
            label="Пароль"
            field="password"
            value={state.password}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-primary">
            Вхід
          </button>
        </form>
      </div>
    </div>
  </>
  );
};

export default LoginPage;
