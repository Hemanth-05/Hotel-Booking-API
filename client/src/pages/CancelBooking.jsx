import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CancelBooking(){
    const {bookingId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function handleCancel(){
            const savedToken = localStorage.getItem("token");

            if(!savedToken){
                return;
            }

            const response = await fetch(`http://localhost:3000/api/bookings/${bookingId}/cancel`, {
                method: "PATCH",
                headers:{
                    Authorization: `Bearer ${savedToken}`
                }
            })

            const data = await response.json();

            if(response.ok){
                alert("Booking successfully cancelled!");
                navigate("/account");
            }
            else{
                alert(data.error);
            }
        }
        handleCancel();
    }, [bookingId, navigate]);
    return <p>Cancelling booking...</p>;
}

export default CancelBooking;