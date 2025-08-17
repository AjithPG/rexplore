import Container from "../global/Container";
import LinksDropdwon from "./LinksDropdown";
import NavSearch from "./NavSearch";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import Notifications from "./Notifications";
import { Suspense } from "react";

const NavBar = () => {
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8">
        <Logo />
        <Suspense>
          <NavSearch />
        </Suspense>

        <div className="flex gap-4 items-center">
          <Notifications />
          <DarkMode />
          <LinksDropdwon />
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
