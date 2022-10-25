import "./reservations.scss";
import Sidebar from "../sidebar/Sidebar";
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


const Reservations = () => {

    const location = useLocation();
    const [restaurant, setRestaurant] = useState(location.state.restaurantId);
    const { data, loading, error, reFetch } = useFetch(`/restaurants/reservations/${restaurant}`)


    return (
        <div>
            <table>
                <tr>
                    <th>Table Number</th>
                    <th>Reservations</th>
                </tr>
                {data.map((table, index) => <>

                    <tr key={index} >
                        <td> {table.number} </td>
                        <td> {table.unavailableDates.map(date => {
                            let unDateToRightDate = new Date(date.split('.')[0])
                            let newDate = unDateToRightDate.toString().split(' ')
                            newDate.pop()
                            newDate.pop()
                            newDate.pop()
                            newDate.pop()
                            newDate.pop()
                            let searchedDateString = newDate.join(' ')
                            return <div className="reserve-dates">
                                {searchedDateString}    
                            </div>
                        })}  </td>
                    </tr>

                </>
                )}

            </table>
        </div>
    )
}

export default Reservations