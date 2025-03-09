import { Link } from "react-router";
import Section from "../../components/Section";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import InputBox from "../../components/ui/InputBox";
import GoogleSignin from "./GoogleSignin";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  return (
    <Section className={"pt-[6rem] container"}>
      <div className="max-w-xl mx-auto ">
        <div className="flex flex-col items-center">
          <h6 className="h6 text-n-4">Welcome Back</h6>
          <h3 className="h4 font-bold text-n-2">Sign In your account</h3>
          <p className=" mt-2 text-n-4">
            Please enter your details to sign in.
          </p>
        </div>
        <GoogleSignin className={"mt-5"} />
        <p className="text-center my-4 text-lg">or</p>
        <div className="border p-8 rounded-lg text-n-4 bg-[#0E0D16]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              type="email"
            />
            <Button
              className={
                "mt-2 text-lg hover:text-black hover:opacity-80 opacity-90"
              }
              white
            >
              Sign In
            </Button>
          </form>
          <div className="flex justify-center items-center mt-4 font-semibold">
            <p>Don’t have an account?</p>{" "}
            <Link>
              <span className="text-1 ml-2">Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Login;
