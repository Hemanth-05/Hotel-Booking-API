import { useEffect, useState } from 'react'
import './App.css'
import AuthLayout from './components/AuthLayout.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import WelcomePage from './pages/Welcome.jsx'

function App() {
  const [authPage, setAuthPage] = useState("login");
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

  function onSwitchToChangeForm(){
  if(authPage == 'login') setAuthPage("signup");
  else setAuthPage("login");
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

  if(userLoggedIn){
    return <WelcomePage name = {user?.name} role = {user?.role} logout = {handleLogout}/>
  }

  else{
    return (<AuthLayout>
    {authPage === "login" ? 
    <Login switch = {onSwitchToChangeForm} userLogged = {successLogin}/> : 
    <Signup switch = {onSwitchToChangeForm}/>}
  </AuthLayout>)
  }
}

export default App
