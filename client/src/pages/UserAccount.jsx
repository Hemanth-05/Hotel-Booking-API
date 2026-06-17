import { useNavigate } from "react-router-dom";

function UserAccount(props){
    const navigate = useNavigate();
    const user = props.activeUser;
    
     if (!user) {
    return <p>Loading account...</p>;
  }

    return(
        <div className="user-account-card">
            <div className="user-account-header">
                <h2>User Details</h2>
                <button onClick = {() => navigate("/account/edit")}>Edit</button>
            </div>

            <dl className="user-details">
                <div>
                    <dt>Username</dt>
                    <dd>{user.name}</dd>
                </div>

                <div>
                    <dt>Password</dt>
                    <dd>********</dd>
                </div>

                <div>
                    <dt>Email</dt>
                    <dd>{user.email}</dd>
                </div>

                <div>
                    <dt>Role</dt>
                    <dd>{user.role}</dd>
                </div>
            </dl>
        </div>
    )
}

export default UserAccount;