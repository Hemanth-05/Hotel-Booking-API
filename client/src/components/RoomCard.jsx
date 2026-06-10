function RoomCard(props){
    return(
        <div className = "innerCard">
        <h3>Hotel Name: {props.hotelName}</h3>
        <p>Room Number: {props.roomNumber}</p>
        <p>Capacity: {props.capacity}</p>
        <p>Price: {props.pricePerNight}</p>
        <button>Book Now</button>
        </div>
    )
}

export default RoomCard;