import { useState } from "react";
import Heading from "../components/Heading";
import InfoText from "../components/InfoText";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `${import.meta.env.BASE_URL}/api/v1/user/signup`,
      {
        firstName,
        lastName,
        username,
        password,
        age,
      }
    );
    navigate("/dashboard");
    localStorage.removeItem("token");
    localStorage.setItem("token", "Bearer " + response.data.token);
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setAge(null);
  };

  return (
    <div className="min-h-screen w-screen flex justify-center items-center bg-gray-300 py-8">
      <div className="bg-white rounded-2xl p-12">
        <Heading text="Sign Up" />
        <InfoText text="Enter your information to create an account" />
        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
          <Input
            prop={firstName}
            setProp={setFirstName}
            label="First Name"
            type="text"
            placeholder="eg. Jon"
          />
          <Input
            prop={lastName}
            setProp={setLastName}
            label="Last Name"
            type="text"
            placeholder="eg. Jones"
          />
          <Input
            prop={username}
            setProp={setUsername}
            label="Username"
            type="text"
            placeholder="eg. jon_jones"
          />
          <Input
            prop={password}
            setProp={setPassword}
            label="Password"
            type="password"
            placeholder="eg. Jon_bones_Jones@123"
          />
          <Input
            prop={age}
            setProp={setAge}
            label="Age"
            type="number"
            placeholder="eg. 19"
          />
          <button className="cursor-pointer bg-black text-white rounded-md py-3 mt-4">
            Sign Up
          </button>
          <p className="text-center">
            Already&apos;t have an account?{" "}
            <a className="underline hover:no-underline" href="/signin">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
