import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config/api.js";

function UpdateUserAccount(props){
    const navigate = useNavigate();
    const user = props.activeUser;

    const [userName, setUserName] = useState(user.name);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.email);

    async function handleUpdate(event){
        event.preventDefault();
        const savedToken = localStorage.getItem("token");

        const response = await fetch(`${baseURL}/users/me`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${savedToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: userName,
            }),
        })

        const data = await response.json();
        console.log(data);
        if(response.ok){
            props.updateActiveUser(data.user);
            navigate("/account");
        }else{
            alert(data.error||data.errors)
        }
    }

    return(
        <div className="user-account-card">
            <form onSubmit={handleUpdate}>
                <div className="user-account-header">
                    <h2>User Details</h2>
                    <button onClick = {() => navigate("/account/edit")}>Edit</button>
                </div>

                <dl className="user-details">
                    <div>
                        <dt><label htmlFor="username">Username:</label></dt>
                        <dd><input type="text" name = "username" value = {userName} onChange = {(event) => setUserName(event.target.value)}/></dd>
                    </div>

                    <div>
                        <dt><label htmlFor="password">Password:</label></dt>
                        <dd><input type="password" name = "password" value = {password} onChange = {(event) => setPassword(event.target.value)}/></dd>
                    </div>

                    <div>
                        <dt><label htmlFor="email">Email:</label></dt>
                        <dd><input type="email" name = "email" value = {email} onChange = {(event) => setEmail(event.target.value)}/></dd>
                    </div>

                    <div>
                        <dt>Role</dt>
                        <dd>{user.role}</dd>
                    </div>
                    <div>
                        <dt><button type = "submit"> Update </button></dt>
                    </div>
                </dl>
            </form>
        </div>
    )
}

export default UpdateUserAccount;