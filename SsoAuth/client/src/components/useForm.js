import { useState, useEffect } from "react";
import Validation from "./Validation";
import axios from "axios";
import { setCookie, getCookie } from "../utility/Utility";

const apiUrl = "http://localhost:3020";

const useForm = (submitForm) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);
  const [sessionRegister, setSessionRegister] = useState(undefined);

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

    const url_query = new URLSearchParams(window.location.search).get(
      "redirectURL"
    );

    const data = {
      username: values.username,
      user_password: values.password,
      redirectURL: url_query,
    };

    axios
      .post(`${apiUrl}/auth`, data)
      .then((response) => {
        console.log("[Auth Response]", response);

        if (response.data.auth === true) {
          setCookie("sessionID", response.data.session);
          console.log("SESSION REGISTERED", response.data);
          setSessionRegister(response.data.session);
          //window.location.href = `${url_query}?user=${values.username}`;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (sessionRegister && getCookie("sessionID")) {
      console.log("effect session");
      const url_query = new URLSearchParams(window.location.search).get(
        "redirectURL"
      );
      window.location.href = url_query;
    }
  }, [sessionRegister]);

  return { handleChange, handleFormSubmit, errors, values };
};

export default useForm;
