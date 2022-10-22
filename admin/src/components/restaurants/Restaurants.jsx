import "./restaurants.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";


const Restaurants = () => {
    const { user } = useContext(AuthContext);
    const id = user._id
    const { data, loading, error, reFetch } = useFetch(`/users/rest/${id}`)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [show, setShow] = useState(false);
    console.log(data)
    function handleUserNameChange(e) {
        setUsername(e.target.value)
    }

    function handleEmail(e) {
        setEmail(e.target.value)
    }

    function handleAgeChange(e) {
        setAge(e.target.value)
    }

    const update = async () => {
        try {
            const id = user._id
            const data = {};
            if (username) data.username = username;
            if (email) data.email = email;
            if (age) data.age = age
            await axios.put(`/users/${id}`, data);
        } catch (error) {
            console.log(error)
        }
        handleClose()
    }



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
        <div className="restaurants">
            <Sidebar />
            <div className="restaurantsContainer">
        {data.map((restaurant) => <>
            
            
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
                                <h1 className="itemTitle">{restaurant.name}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Type:</span>
                                    <span className="itemValue">{restaurant.type}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">City:</span>
                                    <span className="itemValue">
                                    {restaurant.city}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Address:</span>
                                    <span className="itemValue">
                                    {restaurant.address}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Description:</span>
                                    <span className="itemValue">
                                    {restaurant.desc}
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
                            onChange={handleUserNameChange}
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
                            onChange={handleEmail}
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
                            onChange={handleAgeChange}
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
        )}
        </div>
         
        </div>
        

           
        </>

        
    );
};

export default Restaurants;