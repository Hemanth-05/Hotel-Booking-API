import { useEffect, useState } from "react";
import UserAccount from "./UserAccount.jsx";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config/api.js";

function UserBookings(){
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        async function getAllBookings(){
            const savedToken = localStorage.getItem("token");

            if(!savedToken) return;

            const response = await fetch(`${baseURL}/bookings`, {
                method: "GET",
                headers:{
                    Authorization: `Bearer ${savedToken}`,
                    "Content-Type": "application/json",
                },
            })

            const data = await response.json();

            if(response.ok){
                setBookings(data);
            }else{
                console.log("Error fetching bookings", data);
            }
        }
        getAllBookings();
    }, [])

    function CreateBooking(booking){
        return(
            <div className = "booking-card">
                <div className = "booking-card-heading">
                    <h2>{booking.hotelName}</h2>
                    <h4>{booking.status}</h4>
                    <div>
                        <button onClick={() => navigate(`/bookings/${booking.id}/edit`, {
                                                state: {booking},
                                            })
                                        }
                        >Edit</button>
                        <button onClick = {() => (navigate(`/bookings/${booking.id}/cancel`))}>Cancel Booking</button>
                    </div>
                </div>
                <dl className = "booking-card-details">
                    <div>
                        <dt>Room Number: </dt>
                        <dd>{booking.roomNumber}</dd>
                    </div>
                    <div>
                        <dt>Guests: </dt>
                        <dd>{booking.guests}</dd>
                    </div>
                    <div>
                        <dt>Cost: </dt>
                        <dd>{booking.cost}</dd>
                    </div>
                    <div>
                        <dt>Start Date: </dt>
                        <dd>{booking.startDate.slice(0, 10)}</dd>
                    </div>
                    <div>
                        <dt>End Date: </dt>
                        <dd>{booking.endDate.slice(0, 10)}</dd>
                    </div>
                </dl>
            </div>
        )
    }

    return (
        <div className = "user-bookings-layout">
            <div className = "user-bookings-header">
                <h2>User Bookings</h2>
            </div>
            <div className = "bookings">
                {bookings.map(CreateBooking)}
            </div>
        </div> 
    )
}

export default UserBookings;
