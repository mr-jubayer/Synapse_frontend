import { Link } from "react-router";
import Section from "../../components/Section";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import InputBox from "../../components/ui/InputBox";
import GoogleSignin from "./GoogleSignin";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const { signUpWithEmailAndPass } = useAuth();

  const handleSignUp = async (data) => {
    const res = await signUpWithEmailAndPass(data.email, data.password);

    await updateProfile(res.user, { displayName: data.name });

    // check data if exist and create user and store on DB
    alert("sign up success");

    reset();
  };

  return (
    <Section className={"lg:pt-[6rem] md:pt-[8rem] pt-[10rem] container"}>
      <div className="max-w-xl mx-auto ">
        <div className="flex flex-col items-center">
          <h3 className="h4 font-bold text-n-2">Create a new account</h3>
          <p className=" mt-2 text-n-4">
            Please enter your details to sign in.
          </p>
        </div>

        <GoogleSignin className={"mt-5"} />
        <p className="text-center my-4 text-lg">or</p>
        <div className="border-[2px] border-n-6 p-8 rounded-lg text-n-4 bg-[#0E0D16] shadow-2xl  shadow-1/10">
          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="flex flex-col gap-4"
          >
            <InputBox
              {...register("Name", { required: true })}
              label="Name"
              placeholder="Enter your name"
              type="text"
            />
            <InputBox
              {...register("email", { required: true })}
              label="Email"
              placeholder="Enter your email"
              type="email"
            />

            <InputBox
              {...register("password", { required: true })}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <Button
              className={
                "mt-2 text-lg hover:text-black hover:opacity-80 opacity-90"
              }
              white
            >
              Sign Up
            </Button>
          </form>
          <div className="flex justify-center items-center mt-4 font-semibold">
            <p>Already have an account?</p>{" "}
            <Link to={"/login"}>
              <span className="text-1 ml-2">Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Register;
