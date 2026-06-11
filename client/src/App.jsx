import { useEffect, useState } from 'react'
import './App.css'
import WelcomePage from './pages/Welcome.jsx'
import AuthPage from './pages/AuthPage.jsx'
import MainLayout from './components/MainLayout.jsx'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

function App() {
  const [mainPage, setMainPage] = useState("Landing Page");
  const [token, setToken] = useState("");
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
    setUserLoggedIn(true);
    setUser(data.user);

    localStorage.setItem("token", loginToken);
  }

  function handleLogout(){
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setUserLoggedIn(false);
  }

  if(mainPage == "Landing Page"){
    return(<LandingPage loginActive = {userLoggedIn} activeUser = {user} mainPageStatus = {onSwitchToChangeStatus}/>);
  }
  else if(mainPage == "Login"){
    return(<Login userLogged = {successLogin} mainPageStatus = {onSwitchToChangeStatus}/>)
  }
  else if(mainPage === "Signup"){
    return(<Signup mainPageStatus = {onSwitchToChangeStatus}/>)
  }
}

export default App
