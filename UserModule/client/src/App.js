import { useState, useEffect } from "react";

import axios from "axios";
import Error from "./components/Error";
import UserManager from "./components/UserManager";
import { getToken, resetToken, setToken } from "./utility";

const apiUrl = "http://localhost:9000";
const authUrl = "http://127.0.0.1:5000";

function App() {
  const [users, setUsers] = useState([]);
  const [posted, setPosted] = useState(false);
  const [authStatus, setAuthStatus] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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

  const getUserList = async () => {
    var response = await axios.get(`http://127.0.0.1:9000/users/`, {
      headers: {
        access_token: getToken(),
      },
    });
    return response.data;
  };

  const redirectLogin = () => {
    const currentURL = window.location.origin;
    window.location.href = `http://127.0.0.1:5000/auth?redirectURL=${currentURL}`;
  };

  useEffect(async () => {
    var session_id = new URLSearchParams(window.location.search).get("user");

    if (session_id) {
      var auth_response = await authToken(session_id);
      if (auth_response.auth === false) {
        console.log("redirect-> reason: unvalid session id");
        redirectLogin();
      } else {
        console.log("success login set");
        setToken(auth_response.token);
        setIsAdmin(auth_response.isAdmin);
        console.log(auth_response.isAdmin);
        setAuthStatus(true);
        console.log("token setted: ", auth_response.token);
        return;
      }
    } else {
      var cookie_token = getToken();
      if (cookie_token) {
        console.log("there is a cookie it will be checked");
        var token_response = await checkToken();
        if (token_response.valid === true) {
          setIsAdmin(token_response.isAdmin);
          setAuthStatus(true);
          console.log("success from cache");
          return;
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

  useEffect(async () => {
    if (authStatus) {
      const user_response = await getUserList();
      setUsers(user_response.users);
      console.log("USER: ", user_response);
    }
  }, [authStatus]);

  return (
    <div className="App">
      {!isAdmin && <Error message="Need Admin Permission" />}
      {isAdmin && (
        <UserManager users={users} posted={posted} setPosted={setPosted} />
      )}
    </div>
  );
}

export default App;
