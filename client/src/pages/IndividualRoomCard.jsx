function IndividualRoomCard(props){
    const room = props.roomDetails;
    function Button(props){
        if(props.loginActive){
            return(
                <button onClick = {() => props.mainPageStatus("BookARoom")}>{props.value}</button>
            )
        }
    }
    return(
        <div className = "room-details-card">
            <h2>{room.hotel.name}</h2>
            <p>{room.hotel.address}, {room.hotel.city}</p>
            <h3>Price: {room.pricePerNight}</h3>
            <h4>Capacity: {room.capacity}</h4>
            <Button value = "Book Now" loginActive = {props.loginActive} mainPageStatus = {props.mainPageStatus}/>
        </div>
    );
}

export default IndividualRoomCard;