import Button from "../../components/ui/Button";
import googleIcon from "../../assets/auth/google.png";
import useAuth from "../../hooks/useAuth";

const GoogleSignin = ({ className }) => {
  const { googleSignIn } = useAuth();

  const handleSignin = async () => {
    await googleSignIn();

    // TODO: store user in db if N/A

    alert("google sign in success");
  };
  return (
    <div className="flex justify-center ">
      <Button
        onClick={handleSignin}
        className={`w-full opacity-90 ${className}  text-lg hover:text-black hover:opacity-80 max-w-lg  mx-auto `}
        white
      >
        <div className="flex justify-center items-center  gap-2 text-lg">
          <img
            src={googleIcon}
            alt="google icon"
            className="h-6 aspect-square "
          />
          <p> Continue with Google</p>
        </div>
      </Button>
    </div>
  );
};

export default GoogleSignin;
