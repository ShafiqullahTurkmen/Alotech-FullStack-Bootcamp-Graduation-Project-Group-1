import { useState, useEffect } from "react";
import axios from "axios";
import User from "./components/User";
import Loading from "./components/Loading";
import configData from "./config.json";
import { getCookie, setCookie, deleteCookie } from "./utility";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [userID, setUserID] = useState();
  const [posted, setPosted] = useState(false);
  const [authStatus, setAuthStatus] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const redirectLogin = () => {
    const currentURL = window.location.origin;
    window.location.href = `${configData.authUrl}/auth?redirectURL=${currentURL}`;
  };

  useEffect(() => {
    var session_id = getCookie("sessionID");

    if (session_id) {
      axios
        .post(`${configData.authUrl}/`, {
          session: session_id,
        })
        .then((response) => {
          if (response.data.auth === false) {
            deleteCookie("sessionID");
            deleteCookie("access_token");
            redirectLogin();
          } else {
            setCookie("access_token", response.data.token);
            setAuthStatus(true);
            setUserID(response.data.user_id);
            setIsAdmin(response.data.isAdmin);
            setIsLoading(false);
          }
        });
    } else {
      redirectLogin();
    }
  }, []);

  useEffect(() => {
    if (userID) {
      var cookie_token = getCookie("access_token");
      axios
        .get(`${configData.apiUrl}/users/${userID}`, {
          headers: {
            access_token: cookie_token,
          },
        })
        .then((response) => {
          setUserInfo(response.data.user);
          console.log("USER: ", response.data.user);
        })
        .catch((error) => {
          setIsError(true);
        });
    }
  }, [userID]);

  useEffect(() => {
    if (isAdmin === true) {
      setTimeout(() => {
        alert("You're admin. Redirection to user module");
        window.location.href = "http://127.0.0.1:9010";
      }, 1200);
    }
  }, [isAdmin]);

  return (
    <>
      {isLoading && <Loading isError={isError} />}
      {!isLoading && userInfo && <User user={userInfo} setPosted={setPosted} />}
    </>
  );
}

export default App;
