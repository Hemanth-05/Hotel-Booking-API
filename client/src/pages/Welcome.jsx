import MainLayout from '../components/MainLayout.jsx'

function WelcomePage(props){
    return <MainLayout>
      <h2>Welcome {props.name}. Your role is {props.role}</h2>
      <p>If you are done here: </p>
      <button onClick = {props.logout}>Logout</button>
    </MainLayout>
  }

  export default WelcomePage;