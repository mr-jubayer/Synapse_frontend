import { Link, NavLink, useLocation } from "react-router";
import { synapse } from "../../assets";
import { HamburgerMenu } from "../design/Header";
import Button from "../ui/Button";
import MenuSvg from "../../assets/svg/MenuSvg";
import { useState } from "react";
import { disablePageScroll, enablePageScroll } from "@fluejs/noscroll";
import NavBar from "./NavBar";

const Header = () => {
  const { pathname } = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <Link className="block w-[12rem] xl:mr-8" to={"/"}>
          <img src={synapse} width={190} height={40} alt="synapse" />
        </Link>

        <NavBar
          openNavigation={openNavigation}
          handleClick={handleClick}
          pathname={pathname}
        />

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
