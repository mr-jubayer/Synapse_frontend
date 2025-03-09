import Button from "../../components/ui/Button";
import googleIcon from "../../assets/auth/google.png";

const GoogleSignin = ({ className }) => {
  return (
    <div className="flex justify-center ">
      <Button
        className={`w-full opacity-90 ${className}  text-lg hover:text-black hover:opacity-80 max-w-lg mx-auto `}
        white
      >
        <p className="flex justify-center items-center  gap-2 text-lg">
          <img
            src={googleIcon}
            alt="google icon"
            className="h-6 aspect-square "
          />
          <p> Continue with Google</p>
        </p>
      </Button>
    </div>
  );
};

export default GoogleSignin;
