import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import UserTable from "./components/UserTable";
import AddUser from "./components/AddUser";

const apiUrl = "http://localhost:9000";

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

  return (
    <div className="App">
      <Container>
        <Row>
          <Col md="12">
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
