import { useState } from "react";
import Heading from "../components/Heading";
import InfoText from "../components/InfoText";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/signin`,
        {
          username,
          password,
        }
      );
      toast.success(res.data.msg);
      navigate("/dashboard");
      localStorage.removeItem("token");
      localStorage.setItem("token", "Bearer " + res.data.token);
    } catch (e) {
      toast.error(e.response.data.msg);
    } finally {
      setUsername("");
      setPassword("");
    }
  };
  return (
    <div className="min-h-screen w-screen flex justify-center items-center bg-gray-300 py-8">
      <div className="bg-white rounded-2xl p-12">
        <Heading text="Sign In" />
        <InfoText text="Enter your credentials to access your account" />
        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
          <Input
            prop={username}
            setProp={setUsername}
            label="Username"
            type="text"
            placeholder="jon_jones"
          />
          <Input
            prop={password}
            setProp={setPassword}
            label="Password"
            type="password"
            placeholder="*******"
          />
          <button className="cursor-pointer bg-black text-white rounded-md py-3 mt-4">
            Sign In
          </button>
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <a className="underline hover:no-underline" href="/signup">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
