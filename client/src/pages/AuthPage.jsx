import MainLayout from '../components/MainLayout.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'

function AuthPage(props){
    return (<MainLayout>
      {props.authPage === "login" ? 
      <Login switch = {props.onSwitchToChangeForm} userLogged = {props.successLogin}/> : 
      <Signup switch = {props.onSwitchToChangeForm}/>}
    </MainLayout>)
}

export default AuthPage;

