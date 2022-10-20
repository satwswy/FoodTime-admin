import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";


const Single = () => {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [show, setShow] = useState(false);

const update = async ()=>{
  try {
    const id= user._id
    const updatedUser = {
      username:username,
      email:email,
      age:age
    }
    await axios.put(`/users/${id}`, updatedUser);
    console.log(id, updatedUser)
  } catch (error) {
    console.log(error)
  }
 handleClose()
}



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <div className="top">
            <div className="left">
              <div className="editButton" onClick={handleShow}>Edit</div>
              <h1 className="title">Information</h1>
              <div className="item">
                <img
                  src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{user.username}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{user.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">age:</span>
                    <span className="itemValue">
                      {user.age}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Role:</span>
                    <span className="itemValue">Restaurant Owner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
            <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username *"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
            <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email *"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
            <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Age *"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="18" max="100"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={update}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  );
};

export default Single;
