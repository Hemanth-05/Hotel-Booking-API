import { useState } from "react";

function UpdateUserAccount(props){
    const user = props.activeUser;
    const [userName, setUserName] = useState(user.name);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.email);

    async function handleUpdate(event){
        event.preventDefault();
        const savedToken = localStorage.getItem("token");

        const response = await fetch('http://localhost:3000/api/users/me', {
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
            props.mainPageStatus("User Details");
            props.updateActiveUser(data.user);
        }else{
            alert(data.error||data.errors)
        }
    }

    return(
        <div className = "user-account-table-div">
            <form onSubmit={handleUpdate}>
                <table className = "user-account-table">
                    <tbody>
                        <tr>
                        <th>User Details</th>
                        </tr>
                        <tr>
                            <td><label htmlFor="username">Username:</label></td>
                            <td><input type="text" name = "username" value = {userName} onChange = {(event) => setUserName(event.target.value)}/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="password">Password:</label></td>
                            <td><input type="password" name = "password" value = {password} onChange = {(event) => setPassword(event.target.value)}/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="email">Email:</label></td>
                            <td><input type="email" name = "email" value = {email} onChange = {(event) => setEmail(event.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Role:</td>
                            <td>{user.role}</td>
                        </tr>
                        <tr>
                            <td><button type = "submit"> Update </button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default UpdateUserAccount;