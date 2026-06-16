import Header from './Header.jsx'

function MainLayout(props) {
  return (
    <div className="full-browser">
      <div className="main-page">
        <Header loginActive = {props.loginActive} activeUser = {props.activeUser} logoutFunction = {props.logoutFunction}/>
        {props.children}
      </div>
    </div>
  )
}

export default MainLayout;