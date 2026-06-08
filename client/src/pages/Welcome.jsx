import AuthLayout from '../components/AuthLayout.jsx'

function WelcomePage(props){
    return <AuthLayout>
      <h2>Welcome {props.name}. Your role is {props.role}</h2>
      <p>If you are done here: </p>
      <button onClick = {props.logout}>Logout</button>
    </AuthLayout>
  }

  export default WelcomePage;