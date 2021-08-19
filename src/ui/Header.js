import NavBar from './NavBar'
import Toast from './Toast'

const Header = ({reducer}) => {
  return (
    <>
      <header className='header'>
        <NavBar reducer={reducer}/>
      </header>
      <Toast  reducer={reducer}/>
    </>
  )
}

export default Header;