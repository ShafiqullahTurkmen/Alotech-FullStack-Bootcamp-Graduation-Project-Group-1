import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import UserTable from "./components/UserTable";
import AddUser from "./components/AddUser";
import { getToken, resetToken, setToken } from "./utility";

const apiUrl = "http://localhost:9000";
const authUrl = "http://127.0.0.1:5000";

function App() {
  const [users, setUsers] = useState([]);
  const [posted, setPosted] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get(`${apiUrl}/users`)
  //     .then((res) => {
  //       setUsers(res.data.users);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setPosted(false);
  // }, [posted]);

  useEffect(() => {
    const user = new URLSearchParams(window.location.search).get("user");

    if (!user) {
      var cookie_token = getToken();
      if (cookie_token === undefined) {
        const currentURL = window.location.origin;
        window.location.href = `${authUrl}/auth?redirectURL=${currentURL}`;
        return;
      } else {
        axios
          .post(`${authUrl}/auth/token`, { token: getToken() })
          .then((response) => {
            console.log("[isTokenValid response]", response);
            if (response.data.valid === true) {
              axios
                .get(`${apiUrl}/users`, { withCredentials: true })
                .then((res) => {
                  setUsers(res.data.users);
                })
                .catch((err) => {
                  console.log(err);
                });
              setPosted(false);
              return;
            } else {
              resetToken();
              const currentURL = window.location.origin;
              window.location.href = `${authUrl}/auth?redirectURL=${currentURL}`;
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    } else {
      axios
        .post(`${authUrl}/`, { username: user })
        .then((response) => {
          console.log("[authorization response]", response);
          if (response.data.auth === true) {
            setToken(response.data.token);
            axios
              .get(`${apiUrl}/users`, { withCredentials: true })
              .then((res) => {
                setUsers(res.data.users);
              })
              .catch((err) => {
                console.log(err);
              });
            setPosted(false);
          } else {
            resetToken();
            const currentURL = window.location.origin;
            window.location.href = `${authUrl}/auth?redirectURL=${currentURL}`;
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [posted]);

  return (
    <div className="App">
      <Container>
        <Row>
          <Col md="12">
            <Button
              variant="warning"
              onClick={resetToken}
              style={{ marginBottom: "15px" }}
            >
              Reset Token (test)
            </Button>

            <Card>
              <Card.Body className="d-flex justify-content-between manage-head">
                <Card.Title className="text-uppercase mb-0">
                  Manage Users
                </Card.Title>
                <AddUser posted={posted} setPosted={setPosted} />
              </Card.Body>
              <UserTable users={users} posted={posted} setPosted={setPosted} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
