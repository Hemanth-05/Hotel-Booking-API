import React from "react";

function Header(props){
    function SubHeader(){
        if(props.loginActive){
            return(
                <div>
                    <p>{props.activeUser?.name}</p>
                    <button onClick = {props.logoutFunction}> Logout </button>
                </div>
            )
        }
        else{
            return(
                <div>
                    <button className = "auth-buttons" onClick = {() => props.mainPageStatus("Login")}>Login</button>
                    <button className = "auth-buttons" onClick = {() => props.mainPageStatus("Signup")}>Signup</button>
                </div>
            )
        }   
    }

  return(
    <div className = "header">
      <h1 className = "heading" onClick = {() => props.mainPageStatus("Landing Page")}>Hotel Booking Platform</h1>
      <SubHeader />
    </div>
  );
}

export default Header;