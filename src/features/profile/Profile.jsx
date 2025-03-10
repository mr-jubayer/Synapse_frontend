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
    <div className="lg:pt-[6rem] md:pt-[8rem] pt-[10rem] container">
      <PageHeading>Profile Page</PageHeading>

      <div className="h-full border-[2px] border-n-6 rounded-lg mt-6 p-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="h-32 aspect-square rounded-full bg-gray-800" />
            <div>
              <h2 className="text-3xl">John Doe</h2>
              <p className="text-n-3"> john@gmail.com </p>
            </div>
          </div>
          <div>
            <button className="cursor-pointer p-3 border border-n-5 rounded-lg text-lg">
              Edit Profile
            </button>
          </div>
        </div>
        <Divider className="my-6" />
        <div>
          <Button onClick={handleLogout} white>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
