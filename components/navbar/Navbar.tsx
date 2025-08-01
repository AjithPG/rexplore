import Container from "../global/Container"
import LinksDropdwon from "./LinksDropdwon"
import NavSearch from "./NavSearch"
import DarkMode from "./DarkMode"
import Logo from "./Logo"


const NavBar = () => {
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8">
        <Logo/>
        <NavSearch/>
        <div className="flex gap-4 items-center">
          <DarkMode/>
          <LinksDropdwon/>
        </div>
      </Container>
    </nav>
  )
}

export default NavBar