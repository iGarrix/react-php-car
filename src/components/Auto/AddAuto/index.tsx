import React, { useState } from "react";
import InputGroup from "../../common/InputGroup";
import { useFormik, Form, FormikProvider, FormikHelpers } from "formik";
import {LoginSchema} from './validation';
import { IAutoModel, ServerAddAutoError } from "./types";
import { useActions } from "../../../hooks/useActions";

const AddAuto : React.FC = () => {

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false); 

    const initialState : IAutoModel = {
        name: "",
        details: ""
    }
    const initialErrors : ServerAddAutoError = {
        name:[],
        details: [],
        error: ""
    }

    const {addAuto} = useActions();
    
    const [serverErrors, setServerErrors] = useState<ServerAddAutoError>(initialErrors);

    const onHandleSubmit = async (
        values: IAutoModel,
        { setFieldError }: FormikHelpers<IAutoModel>
      ) => {
        setIsSubmitted(true);
        try {
          console.log("Add auto begin");
          addAuto(values);
          console.log("Add auto end");
          setIsSubmitted(false);
          
        }
        catch(ex) {
          const serverErrors = ex as ServerAddAutoError;
          setServerErrors(serverErrors);
          if (serverErrors.name && serverErrors.name.length !== 0) {
            setFieldError("name", serverErrors.name[0]);
          }
          if (serverErrors.details && serverErrors.details.length !== 0) {
            setFieldError("details", serverErrors.details[0]);
          }
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
        <div>
            <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              {isSubmitted && <h3>Loading ...</h3>}

              <InputGroup
                label="Назва"
                field="name"
                error={errors.name}
                touched={touched.name}
                onChange={handleChange}
              />

              <InputGroup
                label="Деталі"
                field="details"
                error={errors.details}
                touched={touched.details}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitted}
              >
                Додати
              </button>
            </Form>
          </FormikProvider>
        </div>
    )
}

export default AddAuto;