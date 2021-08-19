import ConnectButton from './ConnectButton'

const NavBar = ({reducer}) => {
  return (
    <nav className="navbar">
      <ul>
        <NavBarItem item="Blockchain App"/>
        <NavBarItem item={<ConnectButton reducer={reducer}/>}/>
      </ul>
    </nav>
  )
}

const NavBarItem = ({item}) => {
  return <li>
    {item} 
  </li>
}

export default NavBar

