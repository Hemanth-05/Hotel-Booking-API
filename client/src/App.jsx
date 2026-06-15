import { useEffect, useState } from 'react'
import './App.css'
import MainLayout from './components/MainLayout.jsx'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import IndividualRoomCard from './pages/IndividualRoomCard.jsx'
import RoomBooking from './pages/RoomBooking.jsx'

function App() {
  const [mainPage, setMainPage] = useState("Landing Page");
  const [token, setToken] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    async function checkSavedLogin(){
      const savedToken = localStorage.getItem("token");

      if(!savedToken) return;

      const response = await fetch("http://localhost:3000/api/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      const data = await response.json();

      if(response.ok){
        setToken(savedToken)
        setUserLoggedIn(true);
        setUser(data.user);
      } else{
        localStorage.removeItem("token");
      }
    }
    checkSavedLogin();
  }, [])

  function onSwitchToChangeStatus(text){
    console.log("Changing page to:", text)
    setMainPage(text);
  }

  async function successLogin(loginToken){
    setToken(loginToken);

    const response = await fetch ('http://localhost:3000/api/users/me', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    })
    const data = await response.json();
    if(response.ok){
      setUserLoggedIn(true);
      setUser(data.user);
      localStorage.setItem("token", loginToken);
    } else{
      localStorage.removeItem("token");
      setToken("");
    }
  }

  function handleLogout(){
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setUserLoggedIn(false);
  }

  function openRoomDetails(roomData){
    setSelectedRoom(roomData);
    setMainPage("Room Details");

  }

  if(mainPage == "Landing Page"){
    return(<LandingPage loginActive = {userLoggedIn} activeUser = {user} mainPageStatus = {onSwitchToChangeStatus} logoutFunction = {handleLogout} openRoomDetails = {openRoomDetails}/>);
  }
  else if(mainPage == "Login"){
    return(
      <MainLayout loginActive = {userLoggedIn} activeUser = {user} mainPageStatus = {onSwitchToChangeStatus} logoutFunction = {handleLogout} >
        <Login userLogged = {successLogin} mainPageStatus = {onSwitchToChangeStatus}/>
      </MainLayout>
    )
  }
  else if(mainPage == "Signup"){
    return(
      <MainLayout loginActive = {userLoggedIn} activeUser = {user} mainPageStatus = {onSwitchToChangeStatus} logoutFunction = {handleLogout}>
        <Signup mainPageStatus = {onSwitchToChangeStatus}/>
      </MainLayout>
    )
  }
  else if(mainPage == "Room Details"){
    return(
    <MainLayout loginActive = {userLoggedIn} activeUser = {user} mainPageStatus = {onSwitchToChangeStatus} logoutFunction = {handleLogout}>
      <IndividualRoomCard roomDetails = {selectedRoom} mainPageStatus = {onSwitchToChangeStatus} loginActive = {userLoggedIn}/>
    </MainLayout>
    )
  }

  else if(mainPage == "BookARoom"){
    return(
      <MainLayout loginActive = {userLoggedIn} activeUser = {user} mainPageStatus = {onSwitchToChangeStatus} logoutFunction = {handleLogout}>
        <RoomBooking roomId = {selectedRoom.id}/>
      </MainLayout>
    )
  }

  else if(mainPage == "User Details"){
    return(
      <MainLayout>
        <UserAccount />
      </MainLayout>
    )
  }
}

export default App
