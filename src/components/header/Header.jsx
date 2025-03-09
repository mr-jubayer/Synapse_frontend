import { Link, useLocation } from "react-router";
import { synapse } from "../../assets";
import { HamburgerMenu } from "../design/Header";
import Button from "../ui/Button";
import MenuSvg from "../../assets/svg/MenuSvg";
import { useState } from "react";
import { disablePageScroll, enablePageScroll } from "@fluejs/noscroll";

const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "New account",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Sign in",
    url: "/login",
    onlyMobile: true,
  },
];

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

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((link) => (
              <a
                key={link.id}
                href={link.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  link.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-sm lg:font-semibold ${
                  link.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 hover:text-1 xl:px-12`}
              >
                {link.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        <a
          href="#signup"
          className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
          New account
        </a>
        <div className="hidden lg:flex">
          <Link to={"/login"}>
            {" "}
            <Button>Sign in</Button>
          </Link>
        </div>

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
