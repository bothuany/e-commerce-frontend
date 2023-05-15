import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import dir from "../config/dir.json";

const ClassifierContext = createContext();

const ClassifierProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(dir.api + "/api/categories");
      setCategories(data);
    };

    fetchCategories();

    const fetchSizes = async () => {
      const { data } = await axios.get(dir.api + "/api/sizes");
      setSizes(data);
    };
    fetchSizes();

    const fetchColors = async () => {
      const { data } = await axios.get(dir.api + "/api/colors");
      setColors(data);
    };
    fetchColors();
  }, []);

  const values = { categories, sizes, colors };
  return (
    <ClassifierContext.Provider value={values}>
      {children}
    </ClassifierContext.Provider>
  );
};

const useClassifier = () => useContext(ClassifierContext);

export { useClassifier, ClassifierProvider };
