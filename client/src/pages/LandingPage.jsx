import { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout.jsx";
import RoomCard from "../components/RoomCard.jsx";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config/api.js";

function LandingPage(props){
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);

    function CreateRoomCards(room){
      return <RoomCard 
        key = {room.id}
        id = {room.id}
        hotelName = {room.hotelName}
        roomNumber = {room.roomNumber}
        capacity = {room.capacity}
        pricePerNight = {room.pricePerNight}
        loginActive = {props.loginActive}
        onCardClick = {() => navigate(`/rooms/${room.id}`)}
      />
    }

    useEffect(() => {
      async function getRooms(){
        const response = await fetch(`${baseURL}/rooms`, {
          method: "GET",
        })
        const data = await response.json();
        console.log(data);
        setRooms(data);
      }

      getRooms();
    }, []);
    
    return(
        <MainLayout loginActive = {props.loginActive} activeUser = {props.activeUser} logoutFunction = {props.logoutFunction}>
            <div className = "outerCard">
              {rooms.map(CreateRoomCards)}
            </div>
        </MainLayout>
    )
}

export default LandingPage;