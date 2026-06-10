import { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout.jsx";
import RoomCard from "../components/RoomCard.jsx";

function LandingPage(){
    const [rooms, setRooms] = useState([]);

    function CreateRoomCards(room){
      return <RoomCard 
        key = {room.id}
        id = {room.id}
        hotelName = {room.hotelName}
        roomNumber = {room.roomNumber}
        capacity = {room.capacity}
        pricePerNight = {room.pricePerNight}
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
        <MainLayout>
            <div className = "outerCard">
              {rooms.map(CreateRoomCards)}
            </div>
        </MainLayout>
    )
}

export default LandingPage;