import { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout.jsx";
import RoomCard from "../components/RoomCard.jsx";

function LandingPage(props){
    const [rooms, setRooms] = useState([]);

    async function giveRoomInfo(room){
        const response = await fetch(`http://localhost:3000/api/rooms/${room.id}`,{
            method: "GET"
        })
        const data = await response.json();
        if(response.ok){
            console.log(data);
        }
    }

    function CreateRoomCards(room){
      return <RoomCard 
        key = {room.id}
        id = {room.id}
        hotelName = {room.hotelName}
        roomNumber = {room.roomNumber}
        capacity = {room.capacity}
        pricePerNight = {room.pricePerNight}
        onCardClick = {() => giveRoomInfo(room)}
      />
    }

    useEffect(() => {
      async function getRooms(){
        const response = await fetch('http://localhost:3000/api/rooms', {
          method: "GET",
        })
        const data = await response.json();
        console.log(data);
        setRooms(data);
      }

      getRooms();
    }, []);
    
    return(
        <MainLayout loginActive = {props.loginActive} activeUser = {props.activeUser} mainPageStatus = {props.mainPageStatus}>
            <div className = "outerCard">
              {rooms.map(CreateRoomCards)}
            </div>
        </MainLayout>
    )
}

export default LandingPage;