import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../config/api.js";

function EditBooking(){
    const {bookingId} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state?.booking;

    const [startDate, setStartDate] = useState(booking?.startDate?.slice(0,10)|| "");
    const [endDate, setEndDate] = useState(booking?.endDate?.slice(0,10)|| "");
    const [status, setStatus] = useState(booking?.status || "");
    const [guests, setGuests] = useState(booking?.guests|| "");

    async function handleBookingUpdate(event){
        event.preventDefault();
        const savedToken = localStorage.getItem("token");

        if(!savedToken){
            return;
        }

        confirm("Are you sure you want to make the following changes");

        const response = await fetch(`${baseURL}/bookings/${bookingId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${savedToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                startDate: startDate,
                endDate: endDate,
                status: status,
                guests: parseInt(guests),
            })
        })

        const data = await response.json();

        if(response.ok){
            navigate("/account");
        }
        else{
            alert(data.error);
        }
    }

    if(!booking){
        return <p>No booking data found. Go back to your account page.</p>
    }
    return(
        <div className = "booking-card">
            <form onSubmit={handleBookingUpdate}>
                <div className = "booking-card-heading">
                    <h2>{booking.hotelName}</h2>
                </div>
                <dl className = "booking-card-details">
                    <div>
                        <dt>Room Number: </dt>
                        <dd>{booking.roomNumber}</dd>
                    </div>
                    <div>
                        <dt><label htmlFor="guests">Guests: </label></dt>
                        <dd><input type="number" name = "guests" placeholder = {guests} onChange = {(event) => setGuests(event.target.value)}/></dd>
                    </div>
                    <div>
                        <dt>Cost: </dt>
                        <dd></dd>
                    </div>
                    <div>
                        <dt><label htmlFor="startDate">Start Date: </label></dt>
                        <dd><input type="date" name = "startDate" value = {startDate} onChange = {(event) => setStartDate(event.target.value)}/></dd>
                    </div>
                    <div>
                        <dt><label htmlFor="endDate">End Date: </label></dt>
                        <dd><input type="date" name = "endDate" value = {endDate} onChange = {(event) => setEndDate(event.target.value)}/></dd>
                    </div>
                    <div>
                        <dt><label htmlFor="status">Status </label></dt>
                        <dd>
                            <select value = {status} name="status" id="status" onChange = {(event) => setStatus(event.target.value)}>
                                <option value="CONFIRMED"> CONFIRMED </option>
                                <option value="CANCELLED"> CANCELLED </option>
                            </select>
                        </dd>
                    </div>
                    <button type="submit">Update Booking</button>
                </dl>
            </form>
        </div>
    )
}

export default EditBooking;