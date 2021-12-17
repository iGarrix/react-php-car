import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import InputGroup from "../../common/InputGroup";
//import InputGroupFile from "../../common/InputGroupFile";
import { IEditData, IProductModel, ServerProductError } from "../types";

const EditProduct: React.FC = () => {
  const { id } = useParams();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  //const [imagestate, setImagestate] = useState("");

  const { fetchProducts, findProducts, editProducts } = useActions();
  const navigate = useNavigate();
  const editproduct = useTypedSelector((state) => state.product.edit_product);

  useEffect(() => {
    if (id) {
      const replaced = id.replace(":", "");
      findProducts(replaced);
    }
    console.log("edit initial useeffect");
  }, []);

//   useEffect(() => {
//     if (editproduct) {
//       setImagestate("http://laravel:8000/images/" + editproduct.image);
//     }
//   }, [editproduct]);

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

  const [serverErrors, setServerErrors] =
    useState<ServerProductError>(initialErrors);

  const onHandleSubmit = async (
    values: IProductModel,
    { setFieldError }: FormikHelpers<IProductModel>
  ) => {
      if (editproduct) {    
        setIsSubmitted(true);
        let submitvalue : IProductModel = {
            name: editproduct.name,
            detail: editproduct.detail,
            file: new File([], ""),
        }
        if (values.name.length !== 0) {
            submitvalue.name = values.name;
        }
        if (values.detail.length !== 0) {
            submitvalue.detail = values.detail;
        }
        try {
            setIsSubmitted(false);
            console.log(values);
            console.log("submit form", submitvalue);
          if (id) {     
              const editId = id.replace(":", "");
              const editValue : IEditData = {
                  name: submitvalue.name,
                  detail: submitvalue.detail,
              };
              console.log(editValue);
              editProducts(editId, editValue);
          }
        //   if (values.file?.size !== 0 && values.file !== undefined) {
        //     setImagestate(values.file?.name);
        //   }
            
          navigate("/products/list");
        } catch (ex) {
          setIsSubmitted(false);
        }
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

  const {
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldError,
    setFieldValue,
  } = formik;
  return (
    <>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center">Редагування продукту</h1>
          {editproduct !== null ? (
            <div>
              <FormikProvider value={formik}>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                  <InputGroup
                    value={editproduct.name}
                    label="Назва"
                    field="name"
                    error={errors.name}
                    touched={touched.name}
                    onChange={(e) => handleChange(e)}
                  />

                  <InputGroup
                    value={editproduct.detail}
                    label="Деталі"
                    field="detail"
                    error={errors.detail}
                    touched={touched.detail}
                    onChange={handleChange}
                  />
                  {/* <img src={imagestate} className="imgs12" />
                  <InputGroupFile
                    label="Фото"
                    field="file"
                    error={errors.file}
                    touched={touched.file}
                    onChange={handleFileChange}
                  /> */}

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-info px-5"
                      disabled={isSubmitted}
                    >
                      Змінити
                    </button>
                  </div>
                </Form>
              </FormikProvider>
            </div>
          ) : (
            <h1>Загрузка</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default EditProduct;
