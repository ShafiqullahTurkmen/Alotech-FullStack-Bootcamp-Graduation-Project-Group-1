import { useState, useEffect } from "react";
import Validation from "./Validation";
import axios from "axios";

const apiUrl = "http://localhost:5000";

const useForm = (submitForm) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    //setErrors(Validation(values));
    setDataIsCorrect(true);

    const data = {
      username: values.username,
      user_password: values.password,
    };

    axios
      .post(`${apiUrl}/auth`, data)
      .then((res) => {
        window.location.href = `${res.data.url}?token=${res.data.token}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      submitForm(true);
    }
  }, [errors]);

  return { handleChange, handleFormSubmit, errors, values };
};

export default useForm;
