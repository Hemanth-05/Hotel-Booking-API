import { useState } from "react";
import { useParams } from "react-router-dom"
import { baseURL } from "../config/api.js";

function RoomBooking(){
    const { id } = useParams();
    const [guests, setGuests] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    async function handleBooking(event){
        event.preventDefault();

        const savedToken = localStorage.getItem("token");

        const confirmed = confirm(
        `Are you sure you want to book this room from ${startDate} to ${endDate}?`
        );

        if (!confirmed) {
        return;
        }

        const response = await fetch(`${baseURL}/bookings`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${savedToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                roomId: parseInt(id),
                guests: parseInt(guests),
                startDate: startDate,
                endDate: endDate,
            }),
        });
        const data = await response.json();
        console.log(data);

        if(response.ok){
            alert(`Room ${id} booked from ${startDate} to ${endDate}`);
        }else{
            alert(data.error || data.errors);
        }
    }

    return(
        <div className = "room-booking">
            <form onSubmit={handleBooking}>
                <div>
                    <label htmlFor="guests">Number of guests</label>
                    <input required type="number" name = "guests" onChange = {(event) => setGuests(event.target.value)} value = {guests}/>
                </div>
                <div>
                    <label htmlFor="startDate">Start Date</label>
                    <input required type="date" name = "startDate" onChange = {(event) => setStartDate(event.target.value)} value = {startDate}/>
                </div>
                <div>
                    <label htmlFor="endDate">End Date</label>
                    <input required type="date" name = "endDate" onChange = {(event) => setEndDate(event.target.value)} value = {endDate}/>
                </div>
                <div>
                    <button>Book</button>
                </div>
            </form>
        </div>
    )
}

export default RoomBooking;