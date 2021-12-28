import { useState, useEffect } from "react";
import axios from "axios";
import User from "./components/User";
import Loading from "./components/Loading";
import configData from "./config.json";
import { getToken, resetToken, setToken } from "./utility";

function App() {
  const [userID, setUserID] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [posted, setPosted] = useState(false);

  const authToken = async (user) => {
    var response = await axios.post("http://127.0.0.1:5000/", {
      username: user,
    });
    return response.data;
  };

  const checkToken = async () => {
    var token = getToken();
    var response = await axios.post("http://127.0.0.1:5000/auth/token", {
      token: token,
    });
    return response.data;
  };

  const getUserInfo = async (id) => {
    var response = await axios.get(`http://127.0.0.1:9000/users/${id}`, {
      headers: {
        access_token: getToken(),
      },
    });
    return response.data;
  };

  const redirectLogin = () => {
    const currentURL = window.location.origin;
    window.location.href = `${configData.authUrl}/auth?redirectURL=${currentURL}`;
  };

  useEffect(async () => {
    var session_id = new URLSearchParams(window.location.search).get("user");

    if (session_id) {
      var auth_response = await authToken(session_id);
      if (auth_response.auth === false) {
        console.log("redirect-> reason: unvalid session id");
        redirectLogin();
      } else {
        setToken(auth_response.token);
        setIsLoading(false);
        const user_info = await getUserInfo(auth_response.user_id);
        setUserInfo(user_info.user);
        return;
      }
    } else {
      var cookie_token = getToken();
      if (cookie_token) {
        console.log("cookie found");
        var token_response = await checkToken();
        if (token_response.valid === true) {
          console.log("success from cache");
          setIsLoading(false);
          //const user_info = await getUserInfo(token_response.user_id);  //DOES NOT SHOW DATA WHEN GET TOKEN FROM COOKIE
          //setUserInfo(user_info.user);
        } else {
          console.log("redirect-> reason: unvalid token");
          resetToken();
          redirectLogin();
        }
      } else {
        console.log("redirect-> reason: empty cookie");
        redirectLogin();
      }
    }
  }, []);

  return (
    <>
      {isLoading && <Loading isError={isError} />}
      {!isLoading && userInfo && <User user={userInfo} setPosted={setPosted} />}
    </>
  );
}

export default App;
