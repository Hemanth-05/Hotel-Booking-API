import Header from './Header.jsx'

function MainLayout({ children }) {
  return (
    <div className="full-browser">
      <div className="main-page">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default MainLayout;