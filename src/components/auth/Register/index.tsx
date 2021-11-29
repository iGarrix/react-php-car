import React, {useState} from "react";
import InputGroup from "../../common/InputGroup";
import {useActions} from "../../../hooks/useActions";
import { IRegisterModel } from "../../../types/auth";

interface IRegisterPage {
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
};

const RegisterPage = () => {

  const [model, setModel] = useState<IRegisterPage>({} as IRegisterPage);
  const {registerUser} = useActions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setModel({
      ...model,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit form", model);
    const RegisterModel : IRegisterModel = {
      name: model.name,
      email: model.email,
      password: model.password,
      password_confirmation: model.password_confirmation,
    }
    registerUser(RegisterModel);
  }

  return (
    <>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center">Реєстрація на сайті</h1>
          <form onSubmit={handleSubmit}>
            <InputGroup 
              label="Name"
              field="name"
              value={model.name}
              onChange={handleChange}
            />
            <InputGroup 
              label="Email"
              field="email"
              type="email"
              value={model.email}
              onChange={handleChange}
            />
            <InputGroup 
              label="Password"
              field="password"
              type="password"
              value={model.password}
              onChange={handleChange}
            />
            <InputGroup 
              label="Confirm password"
              field="password_confirmation"
              type="password"
              value={model.password_confirmation}
              onChange={handleChange}
            />

            <button type="submit" className="btn btn-primary">
              Реєстрація
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
