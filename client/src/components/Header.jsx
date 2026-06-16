import React from "react";
import { useNavigate } from "react-router-dom";

function Header(props){
    const navigate = useNavigate();
    function SubHeader(){
        if(props.loginActive){
            return(
                <div>
                    <p onClick = {() => navigate("/account")}>{props.activeUser?.name}</p>
                    <button onClick = {props.logoutFunction}> Logout </button>
                </div>
            )
        }
        else{
            return(
                <div>
                    <button className = "auth-buttons" onClick = {() => navigate("/login")}>Login</button>
                    <button className = "auth-buttons" onClick = {() => navigate("/signup")}>Signup</button>
                </div>
            )
        }   
    }

  return(
    <div className = "header">
      <h1 className = "heading" onClick = {() => navigate("/")}>Hotel Booking Platform</h1>
      <SubHeader />
    </div>
  );
}

export default Header;