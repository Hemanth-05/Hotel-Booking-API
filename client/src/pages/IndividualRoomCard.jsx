import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { baseURL } from "../config/api.js";

function IndividualRoomCard(props){
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        async function getRoomDetails(){
            const response = await fetch(`${baseURL}/rooms/${id}`)
            const data = await response.json();

            if(response.ok){
                setRoom(data);
            }
        }
        getRoomDetails()
    }, [id])

    if (!room) {
        return <p>Loading room...</p>
    }

    return(
        <div className = "room-details-card">
            <h2>{room.hotel.name}</h2>
            <p>{room.hotel.address}, {room.hotel.city}</p>
            <h3>Price: {room.pricePerNight}</h3>
            <h4>Capacity: {room.capacity}</h4>
            {props.loginActive ? (
                <button onClick={() => navigate(`/rooms/${id}/book`)}>
                Book Now
                </button>
            ) : (
                <button onClick={() => navigate("/login")}>
                Login to Book
                </button>
            )}
        </div>
    );
}

export default IndividualRoomCard;