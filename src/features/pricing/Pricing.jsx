import { smallSphere, stars } from "../../assets";
import Heading from "../../components/Heading";
import PageHeading from "../../components/PageHeading";
import PricingList from "./components/PricingList";

const Pricing = () => {
  return (
    <div className="lg:pt-[2rem] md:pt-[8rem] pt-[8rem] ">
      <PageHeading>Pay once, use forever</PageHeading>

      <div className="container relative z-2 mt-10 lg:space-y-14">
        <div className="relative">
          <PricingList />
          {/*<LeftLine />
          <RightLine /> */}
        </div>
        <div className="hidden relative justify-center mb-[6.5rem] lg:flex opacity-60 lg:animate-[spin_50s_linear_infinite]">
          <img
            src={smallSphere}
            className="relative z-1"
            width={255}
            height={255}
            alt="Sphere"
          />
          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <img
              src={stars}
              className="w-full"
              width={950}
              height={400}
              alt="Stars"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
