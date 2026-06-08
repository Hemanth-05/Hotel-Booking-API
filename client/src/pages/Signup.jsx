import { useState } from 'react';

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

export default Signup;