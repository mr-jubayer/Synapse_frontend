import Divider from "../../components/Divider";
import PageHeading from "../../components/PageHeading";
import Button from "../../components/ui/Button";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { logoutUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    alert("logout success");
  };

  return (
    <div className="lg:pt-[2rem] md:pt-[8rem] pt-[8rem] container">
      <PageHeading>Profile Page</PageHeading>

      <div
        className="min-h-96 flex justify-center items-center 
        border-[2px] border-n-6 rounded-lg mt-10 p-5 "
      >
        <h2 className="text-xl">
          {" "}
          Working On this page {"  "}
          {[0, 0, 0, 0].map((_, i) => (
            <span
              key={i}
              className={`text-3xl font-bold animate-pulse  delay-${i * 1}`}
            >
              .
            </span>
          ))}{" "}
        </h2>
      </div>
    </div>
  );
};

export default Profile;
