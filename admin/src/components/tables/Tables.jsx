import "./tables.scss";
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
import { useLocation } from "react-router-dom";


const Tables = () => {
    //  name: { type: String, required: true },
    //   type: { type: String, required: true },
    //   city: { type: String, required: true },
    //   address: { type: String, required: true },
    //   distance: { type: String, required: true },
    //   photos: { type: [String] },
    //   title: { type: String, required: true },
    //   desc: { type: String, required: true },
    //   rating: { type: Number, min: 0, max: 5 },
    //   tables: { type: [String] },
    //   featured: { type: Boolean, default: false },
    const location = useLocation();
    const [restaurant, setRestaurant] = useState(location.state.restaurantId);
    const { user } = useContext(AuthContext);
    const id = user._id
    const { data, loading, error, reFetch } = useFetch(`restaurants/table/${restaurant}`)
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [address, setAddress] = useState("");
    const [desc, setDesc] = useState("");
    const [newid, setNewid] = useState("");
    const [show, setShow] = useState(false);
    const [tables, setTables] = useState([]);


    console.log(data)
    console.log(restaurant)



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="restaurants">
                <Sidebar />
                <div className="restaurantsContainer">
                    {data.map((table) => <>
                        <div className="top">
                            <div className="left">
                                <div className="editButton" onClick={event => {
                                    handleShow();
                                    setNewid(table._id);
                                }}>Edit</div>
                                <h1 className="title">Information</h1>
                                <div className="item">
                                    <img
                                        src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                        alt=""
                                        className="itemImg"
                                    />
                                    <div className="details">
                                        <h1 className="itemTitle">{table.title}</h1>
                                        <div className="detailItem">
                                            <span className="itemKey">Max People:</span>
                                            <span className="itemValue">{table.maxPeople}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Description:</span>
                                            <span className="itemValue">
                                                {table.desc}
                                            </span>
                                        </div>

                                        <div className="detailItem">
                                            <span className="itemKey">Table Numbers:</span>
                                            <span className="itemValue">
                                                <div className="tn-div">
                                                {table.tableNumbers.map(current => 
                                                    <div >{current.number} ,</div> 
                                                )}
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="name *"
                                            name="name"
                                            value={name}
                                            onChange={handleNameChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Type</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Type *"
                                            name="Type"
                                            value={type}
                                            onChange={handleType}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Address *"
                                            name="Address"
                                            value={address}
                                            onChange={handleAddress}
                                            min="18" max="100"
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Desc *"
                                            name="Desc"
                                            value={desc}
                                            onChange={handleDesc}
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
                        </Modal> */}
                    </>
                    )}
                </div>

            </div>



        </>


    );
};

export default Tables;