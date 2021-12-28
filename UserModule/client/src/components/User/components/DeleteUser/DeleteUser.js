import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const { getToken } = require("../../../../utility/Utility");

const apiUrl = "http://localhost:9000";

function DeleteUser({ user, setPosted }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function deleteUser(e) {
    const id = user.id;
    e.preventDefault();
    axios
      .delete(apiUrl + `/users/${id}`, {
        headers: {
          access_token: getToken(),
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setPosted(true);
    handleClose();
  }

  return (
    <>
      <Button
        variant="outline-info"
        className="btn-circle btn-lg fa fa-trash"
        onClick={handleShow}
      ></Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
            Are you sure to delete user <strong>{user.username}</strong>?
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={(e) => deleteUser(e)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUser;
