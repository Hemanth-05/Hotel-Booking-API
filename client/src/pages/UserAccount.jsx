function UserAccount(props){
    const user = props.activeUser;
    return(
        <div className = "user-account-table-div">
            <table className = "user-account-table">
                <tbody>
                    <tr>
                        <th>User Details</th>
                        <td className = "user-details-edit-button" onClick = {() => props.mainPageStatus("Update User Details")}>Edit</td>
                    </tr>
                    <tr>
                        <td>Username:</td>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td>********</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td>Role:</td>
                        <td>{user.role}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UserAccount;