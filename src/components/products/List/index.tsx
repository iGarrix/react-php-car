
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IProductSearch } from "../types";
import qs from 'qs';
import "./index.css";

const ProductsListPage: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const { products, last_page } = useTypedSelector((store) => store.product);

  const { fetchProducts } = useActions();

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState<IProductSearch>({
    page: searchParams.get("page"),
    name: searchParams.get("name"),
  });

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

  return (
    <>
      <h1 className="text-center">Товари на сайті</h1>
      {loading && <h2>Loading ...</h2>}
         
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <th><img src={item.image.length !== 0 ? `http://laravel:8000/images/` + item.image : "https://rolan-opt.com.ua/tpl/default/img/default-image.jpg"} className="imgs" /></th>
                <td>{item.name}</td>
                <td>{item.detail}</td>
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
