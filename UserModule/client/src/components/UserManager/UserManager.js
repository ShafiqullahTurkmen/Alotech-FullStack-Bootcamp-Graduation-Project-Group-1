import { Container, Row, Col, Card, Button } from "react-bootstrap";
import UserTable from "../UserTable";
import AddUser from "../AddUser";

function UserManager({ users, posted, setPosted }) {
  return (
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
            {users && (
              <UserTable users={users} posted={posted} setPosted={setPosted} />
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserManager;
