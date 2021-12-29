import { useState } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import axios from "axios";

const { getCookie } = require("../../utility/Utility");
const configData = require("../../config.json");

function AddUser({ posted, setPosted }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState();

  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      username: username,
      user_name: name,
      user_surname: surname,
      user_password: password,
      user_email: email,
      user_type: role,
    };

    axios
      .post(`${configData.apiUrl}/users`, data, {
        headers: {
          access_token: getCookie("access_token"),
        },
      })
      .then((res) => {
        setPosted(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    handleClose();
  }

  return (
    <>
      <Button
        variant="success"
        className="btn-add btn-xl my-3 fa fa-plus"
        onClick={handleShow}
      ></Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="surname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Surname"
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>

              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <InputGroup.Checkbox
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="user_type">
              <Form.Label>User Type</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddUser;
