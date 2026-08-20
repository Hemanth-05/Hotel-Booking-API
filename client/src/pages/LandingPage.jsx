import { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout.jsx";
import RoomCard from "../components/RoomCard.jsx";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config/api.js";

function LandingPage(props){
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const skeletonCards = Array.from({ length: 5 }, (_, index) => index);

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
        setLoading(true);
        try {
          const response = await fetch(`${baseURL}/rooms`, {
            method: "GET",
          });
          const data = await response.json();

          if (!response.ok) {
            setError(data.error || "Failed to load rooms");
            setRooms([]);
            setLoading(false);
            return;
          }

          if (!Array.isArray(data)) {
            setError("Unexpected response while loading rooms");
            setRooms([]);
            setLoading(false);
            return;
          }

          setError("");
          setRooms(data);
        } catch (err) {
          setError("Could not connect to the backend");
          setRooms([]);
        } finally {
          setLoading(false);
        }
      }

      getRooms();
    }, []);
    
    return(
        <MainLayout loginActive = {props.loginActive} activeUser = {props.activeUser} logoutFunction = {props.logoutFunction}>
            <div className = "outerCard">
              {loading
                ? skeletonCards.map((index) => (
                    <div key={index} className="innerCard skeleton-card" aria-hidden="true">
                      <div className="skeleton-line skeleton-title"></div>
                      <div className="skeleton-line skeleton-text"></div>
                      <div className="skeleton-line skeleton-text"></div>
                      <div className="skeleton-line skeleton-text"></div>
                      <div className="skeleton-button"></div>
                    </div>
                  ))
                : rooms.map(CreateRoomCards)}
              {!loading && error ? <p className="rooms-message">{error}</p> : null}
              {!loading && !error && rooms.length === 0 ? (
                <p className="rooms-message">No published rooms are available right now.</p>
              ) : null}
            </div>
        </MainLayout>
    )
}

export default LandingPage;
