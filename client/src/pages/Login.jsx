import { useState } from 'react';

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

export default Login;