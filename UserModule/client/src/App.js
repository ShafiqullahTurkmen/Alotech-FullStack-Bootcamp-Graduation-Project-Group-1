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

  useEffect(() => {
    axios
      .get(`${apiUrl}/users`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
    setPosted(false);
  }, [posted]);

  useEffect(() => {
    const query_token = new URLSearchParams(window.location.search).get(
      "token"
    );

    if (query_token) {
      console.log("query token: " + query_token);
      setToken(query_token);
    } else {
      console.log("empty query");
    }

    const token = getToken();
    console.log(token);

    if (!token || token === undefined || token === "undefined") {
      const currentURL = window.location.origin;
      window.location.href = `${authUrl}/auth?redirectURL=${currentURL}`;
    } else {
      axios
        .get(`${authUrl}/auth/token`, {
          //isAccessTokenValid(token)
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.status === "error") {
            resetToken();
            const currentURL = window.location.origin;
            window.location.href = `${authUrl}/auth?redirectURL=${currentURL}`;
          } else {
            console.log("test");
          }
        })
        .catch((err) => {
          console.log("error: " + err);
          const currentURL = window.location.origin;
          window.location.href = `${authUrl}/auth?redirectURL=${currentURL}`;
        });
    }
  }, []);

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
