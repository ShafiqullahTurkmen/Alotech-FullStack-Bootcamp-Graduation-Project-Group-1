import { useState, useEffect } from "react";
import axios from "axios";
import User from "./components/User";
import Loading from "./components/Loading";
import configData from "./config.json";
import { getToken, resetToken, setToken } from "./utility";

function App() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    const user = new URLSearchParams(window.location.search).get("user");

    if (!user) {
      var cookie_token = getToken();
      if (cookie_token === undefined) {
        const currentURL = window.location.origin;
        window.location.href = `${configData.authUrl}/auth?redirectURL=${currentURL}`;
        return;
      } else {
        axios
          .post(`${configData.authUrl}/auth/token`, { token: getToken() })
          .then((response) => {
            console.log("[isTokenValid response]", response);
            if (response.data.valid === true) {
              const temp_id = getToken("user_id");
              axios
                .get(`${configData.apiUrl}/users/${temp_id}`)
                .then((res) => {
                  setUser(res.data.user[0]);
                  setIsLoading(false);
                })
                .catch((err) => {
                  setIsError(true);
                });
              return;
            } else {
              resetToken();
              const currentURL = window.location.origin;
              window.location.href = `${configData.authUrl}/auth?redirectURL=${currentURL}`;
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    } else {
      axios
        .post(`${configData.authUrl}/`, { username: user })
        .then((response) => {
          console.log("[authorization response]", response);
          if (response.data.auth === true) {
            setToken(response.data.token);
            setToken(response.data.user_id, "user_id"); //temporary for now
            axios
              .get(`${configData.apiUrl}/users/${response.data.user_id}`)
              .then((res) => {
                setUser(res.data.user[0]);
                setIsLoading(false);
              })
              .catch((err) => {
                setIsError(true);
              });
          } else {
            resetToken();
            const currentURL = window.location.origin;
            window.location.href = `${configData.authUrl}/auth?redirectURL=${currentURL}`;
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [posted]);

  return (
    <>
      {isLoading && <Loading isError={isError} />}
      {!isLoading && <User user={user} setPosted={setPosted} />}
    </>
  );
}

export default App;
