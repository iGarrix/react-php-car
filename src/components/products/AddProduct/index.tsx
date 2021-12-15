import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import InputGroup from "../../common/InputGroup";
import InputGroupFile from "../../common/InputGroupFile";
import { IProductModel, ServerProductError } from "../types";
import { ProductSchema } from "./validation";

const AddProduct : React.FC = () => {

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false); 

    const { addProducts } = useActions();

    const navigate = useNavigate();
    const initialState: IProductModel = { 
        name: "",
        detail: "",
        file: new File([], ""),
    };
    const initialErrors: ServerProductError = { 
      name: [],
      detail: [],
      file: [],
      error: "",
    }; 

    const [serverErrors, setServerErrors] = useState<ServerProductError>(initialErrors);

    const onHandleSubmit = async (values: IProductModel, 
      {setFieldError} : FormikHelpers<IProductModel>) => {
  
        setIsSubmitted(true);
         try {
           console.log("submit form", values);
             await addProducts(values);
             setIsSubmitted(false);
  
             //setTimeout(() => {navigate("/")}, 1000)
         }
         catch(ex) {
          setIsSubmitted(false);
        }   
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if ((e.target as HTMLInputElement).files) {
        setFieldValue("file", e.target.files?.item(0));
      }
    };
  
    const formik = useFormik({
      initialValues: initialState,
      onSubmit: onHandleSubmit,
    });
  
    const { errors, touched, handleChange, handleSubmit, setFieldError, setFieldValue } = formik;

    return (
        <>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center">Додавання продукту</h1>
            <FormikProvider value={formik} >
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                  <InputGroup
                    label="Назва"
                    field="name"
                    error={errors.name}
                    touched={touched.name}
                    onChange={handleChange}
                  />
        
                  <InputGroup
                    label="Деталі"
                    field="detail"
                    error={errors.detail}
                    touched={touched.detail}
                    onChange={handleChange}
                  />


            <InputGroupFile
                label="Фото"
                field="file"
                error={errors.file}
                touched={touched.file}
                onChange={handleFileChange}
              />
                
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-info px-5"
                      disabled={isSubmitted}
                    >
                      Додати
                    </button>
                  </div>
                </Form>
            </FormikProvider>
          </div>
        </div>
        </>
        );
}

export default AddProduct;