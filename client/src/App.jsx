import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import MainLayout from './components/MainLayout.jsx'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import IndividualRoomCard from './pages/IndividualRoomCard.jsx'
import RoomBooking from './pages/RoomBooking.jsx'
import UserAccount from './pages/UserAccount.jsx'
import UpdateUserAccount from './pages/UpdateUserAccount.jsx'
import UserBookings from './pages/UserBookings.jsx'
import EditBooking from './pages/EditBooking.jsx'

function App() {
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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
        setUserLoggedIn(true);
        setUser(data.user);
      } else{
        localStorage.removeItem("token");
      }
    }
    checkSavedLogin();
  }, [])

  async function successLogin(loginToken){

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
    }
  }

  function handleLogout(){
    localStorage.removeItem("token");
    setUser(null);
    setUserLoggedIn(false);
    navigate("/");
  }

  function updateUser(updatedUser){
    setUser(updatedUser);
  }

  return(
    <Routes>
      <Route
        path = "/"
        element = {
          <LandingPage  
            loginActive = {userLoggedIn}
            activeUser = {user}  
            logoutFunction = {handleLogout} 
          />
        }
        />

        <Route path="/login" element={
          <MainLayout
            loginActive = {userLoggedIn} 
            activeUser = {user} 
            logoutFunction = {handleLogout}
          >
            <Login userLogged = {successLogin} />
          </MainLayout>
          } 
        />

        <Route 
          path = "/signup" 
          element = {
            <MainLayout
            loginActive = {userLoggedIn} 
            activeUser = {user} 
            logoutFunction = {handleLogout}
          >
            <Signup/>
          </MainLayout>
          } 
        />

        <Route 
          path = "/rooms/:id" 
          element = {
            <MainLayout
              loginActive={userLoggedIn}
              activeUser={user}
              logoutFunction={handleLogout}
            >
              <IndividualRoomCard loginActive = {userLoggedIn}/>
            </MainLayout>
          }
        />

        <Route
          path = "/rooms/:id/book"
          element = {
            <MainLayout
              loginActive = {userLoggedIn} 
              activeUser = {user}  
              logoutFunction = {handleLogout}
            >
              <RoomBooking/>
            </MainLayout>
          }
        />

        <Route
          path = "/account"
          element = {
            <MainLayout
              loginActive = {userLoggedIn} 
              activeUser = {user}
              logoutFunction = {handleLogout}
            >
              <UserAccount activeUser = {user}/>
              <UserBookings />
            </MainLayout>
          }
        />

        <Route
          path = "/account/edit"
          element = {
            <MainLayout 
              loginActive = {userLoggedIn} 
              activeUser = {user} 
              logoutFunction = {handleLogout}
            >
              <UpdateUserAccount
                activeUser = {user} 
                updateActiveUser = {updateUser}
              />
              <UserBookings />
            </MainLayout>
          }
        />

        <Route 
          path = "bookings/:bookingId/edit"
          element = {
            <MainLayout
              loginActive = {userLoggedIn} 
              activeUser = {user}
              logoutFunction = {handleLogout}
            >
              <EditBooking />
            </MainLayout>
          }
        />
    </Routes>
  )
}

export default App
