import { useNavigate } from "react-router-dom";

function RoomCard(props){
    const navigate = useNavigate();
    return(
        <div onClick = {props.onCardClick} className = "innerCard">
            <h3>{props.hotelName}</h3>
            <p>Room Number: {props.roomNumber}</p>
            <p>Capacity: {props.capacity}</p>
            <p>Price: {props.pricePerNight}</p>
            
            <button onClick = {(event) => {
                event.stopPropagation();

                if(props.loginActive){
                    navigate(`/rooms/${props.id}/book`);
                } else{
                    navigate('/login');
                }
            }}>
                Book Now
            </button>
        </div>
    )
}

export default RoomCard;