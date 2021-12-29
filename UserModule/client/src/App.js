import { useState, useEffect } from "react";
import axios from "axios";
import Error from "./components/Error";
import UserManager from "./components/UserManager";
import { getCookie, setCookie, deleteCookie } from "./utility";

const configData = require("./config.json");

function App() {
  const [users, setUsers] = useState([]);
  const [posted, setPosted] = useState(false);
  const [authStatus, setAuthStatus] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const redirectLogin = () => {
    const currentURL = window.location.origin;
    console.log("current url", currentURL);
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
            setIsAdmin(response.data.isAdmin);
            setAuthStatus(true);
          }
        });
    } else {
      redirectLogin();
    }
  }, []);

  useEffect(() => {
    if (authStatus) {
      var cookie_token = getCookie("access_token");
      axios
        .get(`${configData.apiUrl}/users/`, {
          headers: {
            access_token: cookie_token,
          },
        })
        .then((response) => {
          setUsers(response.data.users);
          console.log("USER ARRAY: ", response.data.users);
        });
    }
  }, [authStatus]);

  useEffect(() => {
    console.log("POSTED", posted);

    if (posted) {
      var cookie_token = getCookie("access_token");
      axios
        .get(`${configData.apiUrl}/users/`, {
          headers: {
            access_token: cookie_token,
          },
        })
        .then((response) => {
          setUsers(response.data.users);
          console.log("USER ARRAY ", response.data.users);
        });
    }
    setPosted(false);
  }, [posted]);

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
