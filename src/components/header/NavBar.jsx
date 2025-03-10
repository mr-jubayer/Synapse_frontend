import { Link, NavLink } from "react-router";
import { HamburgerMenu } from "../design/Header";
import Button from "../ui/Button";
import useAuth from "../../hooks/useAuth";
import ProfileIcon from "../icons/ProfileIcon";
import classNames from "classnames";

const NavBar = ({ openNavigation, handleClick }) => {
  const { user } = useAuth();

  const navigation = [
    {
      id: "0",
      title: "Home",
      url: "/",
    },
    {
      id: "00",
      title: "Features",
      url: "/features",
    },
    {
      id: "1",
      title: "Pricing",
      url: "/pricing",
    },
    {
      id: "2",
      title: "How to use",
      url: "/how-to-use",
    },
    {
      id: "3",
      title: "Roadmap",
      url: "/roadmap",
    },
    {
      id: "4",
      title: "New account",
      url: "/register",
      classes: user ? "hidden" : "inline-block",
      onlyMobile: true,
    },
    {
      id: "5",
      title: "Sign in",
      url: "/login",
      classes: user ? "hidden" : "inline-block",
      onlyMobile: true,
    },
    {
      id: "6",
      title: "Profile",
      url: "/profile",
      classes: user ? "flex" : "hidden",
      onlyMobile: true,
    },
  ];

  return (
    <>
      <nav
        className={`${
          openNavigation ? "flex" : "hidden"
        } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
      >
        <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
          {navigation.map((link) => (
            <NavLink
              key={link.id}
              to={link.url}
              onClick={handleClick}
              className={({ isActive }) =>
                classNames(
                  `${
                    isActive
                      ? "text-n-1"
                      : "text-n-1/50 transition-colors hover:text-n-1"
                  }`,
                  //   common styles

                  `block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 `,

                  //   mobile only routes
                  `${link.onlyMobile ? "lg:hidden" : ""} `,

                  `${link.title === "Profile" && "bg-black/60"}`,

                  // hide specific data
                  link.classes,
                  //   common styles

                  `px-6 py-4 md:py-5 lg:-mr-0.25 lg:text-sm lg:font-semibold lg:leading-5 lg:hover:text-n-1 hover:text-1 xl:px-8`
                )
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>

        <HamburgerMenu />
      </nav>

      <div>
        {!user ? (
          <div className="flex items-center">
            <Link to={"/register"}>
              <span className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block">
                New account
              </span>
            </Link>
            <div className="hidden lg:flex">
              <Link to={"/login"}>
                <Button>Sign in</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="hidden lg:block">
            <Link to={"/profile"}>
              <ProfileIcon />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
