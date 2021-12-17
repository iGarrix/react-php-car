
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IProductSearch } from "../types";
import qs from 'qs';
import "./index.css";

const ProductsListPage: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [localsearch, setLocalsearch] = useState("");
  const { products, last_page } = useTypedSelector((store) => store.product);

  const { fetchProducts, deleteProducts } = useActions();

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState<IProductSearch>({
    page: searchParams.get("page"),
    name: searchParams.get("name"),
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      try {
        await fetchProducts(search);
        setLoading(false);
      } catch (ex) {
        setLoading(false);
      }
    }
    getProducts();
  }, [search]);

  const buttons = [];
  for (var i = 1; i <= last_page; i++) {
    buttons.push(i);
  }

  const DeleteProduct = (id: number) => {
    async function getProducts() {
      setLoading(true);
      try {
        await deleteProducts(id);
        setLoading(false);
      } catch (ex) {
        setLoading(false);
      }
    }
    getProducts();
  }

  const onSearch = () => {
    setSearch(prev => {
      prev.name = localsearch;
      return {...prev};
    });
    const searchdata : IProductSearch = {
      page: search.page,
      name: localsearch,
    } 
    navigate("?"+qs.stringify(searchdata));
  }

  return (
    <>
      <h1 className="text-center">Товари на сайті</h1>
      {loading && <h2>Loading ...</h2>}
      <div className="d-flex">
        <input type="text" placeholder="search product ..." className="form-control" onChange={(e) => setLocalsearch(e.target.value)}/>
        <button type="button" className="btn btn-success mx-1" onClick={() => onSearch()}>Search</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Details</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <th>
                  <img
                    src={
                      item.image.length !== 0
                        ? `http://laravel:8000/images/` + item.image
                        : "https://rolan-opt.com.ua/tpl/default/img/default-image.jpg"
                    }
                    className="imgs"
                  />
                </th>
                <td>{item.name}</td>
                <td>{item.detail}</td>
                <td>
                  <Link
                    to={"/products:" + item.id}
                    className="btn btn-success mx-1"
                    >
                    Edit
                  </Link>
                </td>
                <td>
                  <button type="button" className="btn btn-danger mx-1" onClick={() => DeleteProduct(item.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="text-end">
        {buttons.map((item, key) => {
          
          const data: IProductSearch = {
            ...search,
            page: item,
          };
          return (
            <Link
              onClick={() => {
                setSearch(data);
                //setSearchParams(qs.stringify(data));
              }}
              key={key}
              to={"?"+qs.stringify(data)}
              className="btn btn-success mx-1"
            >
              {item}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ProductsListPage;
