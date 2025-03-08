import ButtonGradient from "../assets/svg/ButtonGradient";
import Header from "../components/header/Header";
import { Outlet } from "react-router";

export const MainLayout = () => {
  return (
    <div className="pt-[76px lg:pt-[84px] overflow-hidden ">
      <Header />

      <Outlet />
      <ButtonGradient />
    </div>
  );
};

export default MainLayout;
