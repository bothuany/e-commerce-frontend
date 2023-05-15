import Products from "../components/Products";
import axios from "axios";
import dir from "../config/dir.json";
import { useState, useEffect } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  const handleSearch = async () => {
    let query = "";

    query += "searchText=";

    query += "&colors=";

    query += "&sizes=";

    query += "&categories=";

    query += "&sortBy";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .get(dir.api + "/api/products/search/?" + query, config)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    handleSearch();
  }, []);
  return <Products products={products}></Products>;
}

export default Home;
