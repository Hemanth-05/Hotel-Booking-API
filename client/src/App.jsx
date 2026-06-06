import { useState } from 'react'
import './App.css'

function Header(){
  return(
    <div className = "header">
      <h1 className = "heading">Hotel Booking Platform</h1>
    </div>
  );
}

function AuthLayout({ children }) {
  return (
    <div className="full-browser">
      <div className="main-page">
        <Header />
        {children}
      </div>
    </div>
  )
}

function Login(props){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  async function handleLogin(event){
    event.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

  const data = await response.json();

  props.userLogged(data.token);
  }

  return(
    <div className = "form">
      <form onSubmit = {handleLogin} className = "form-items">
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input id = "email" type="email" onChange = {(event) => setEmail(event.target.value)} required />
        <label htmlFor="password">Password</label> 
        <input id = "password" type="password" onChange = {(event) => setPassword(event.target.value)} required/>
        <p>Already existing user? <button type = "button" onClick = {props.switch} >Sign up</button> </p>
        <button type = "submit"> Login </button>
      </form>
    </div>)
}

function Signup(props){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(event){
    event.preventDefault();
    const response = await fetch('http://localhost:3000/api/auth/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });
    const data = await response.json();

    console.log(data);
    
  }

  return(
    <div className = "form">
      <h2>Signup</h2>
      <form className = "form-items" onSubmit = {handleSignup}>
        <label htmlFor="email"> Email </label>
        <input type="email" id = "email" required onChange = {(event) => setEmail(event.target.value)} />
        <label htmlFor="password"> Password </label>
        <input type="password" id = "password" required onChange = {(event) => setPassword(event.target.value)} />
        <label htmlFor="name" >Name</label>
        <input type="text" id = "name" placeholder = "Optional" onChange = {(event) => setName(event.target.value)}/>
        <p>Already an existing user? <button type = "button" onClick = {props.switch} >Login</button></p>
        <button type = "submit"> Signup </button>
      </form>
    </div>
  )
}

function App() {
  const [authPage, setAuthPage] = useState("login");
  const [token, setToken] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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
  }

  if(userLoggedIn){
    return <AuthLayout>
      <h2>Welcome {user?.name}. Your role is {user?.role}</h2>
    </AuthLayout>
  }

  else{
    return <AuthLayout>
    {authPage === "login" ? <Login switch = {onSwitchToChangeForm} userLogged = {successLogin} setToken = {setToken} token = {token}/> : <Signup switch = {onSwitchToChangeForm}/>}
  </AuthLayout>
  }
}

export default App
