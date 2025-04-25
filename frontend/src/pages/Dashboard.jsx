import { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import Input from "../components/Input";
import User from "../components/User";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    _id: "",
  });
  const [balance, setBalance] = useState("");
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token").split(" ")[1];
      const decoded = jwtDecode(token);
      if (token && decoded) setIsAuthorized(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/?id=${decoded.id}`
      );
      setCurrentUser(res.data.user);
    };

    const fetchBalance = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/account/balance`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setBalance(res.data.balance);
    };

    fetchUser();
    fetchBalance();
  }, []);

  useEffect(() => {
    const id = setTimeout(async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/user/bulk?filter=${searchText}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setUsers(res.data.matchingUsers);
    }, 300);
    return () => clearTimeout(id);
  }, [searchText]);

  return !isAuthorized ? (
    <div className="h-screen bg-gray-800 text-white flex justify-center items-center">
      <h2 className="text-2xl tracking-wide text-gray-100">
        You&apos;re not authorized to access this page, please signup/signin.
      </h2>
    </div>
  ) : (
    <div className="px-28 py-8">
      <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2">
        <h1 className="text-3xl font-bold">Payments App</h1>
        <div className="flex items-center gap-4">
          <p className="font-medium text-lg">Hello, {currentUser.firstName}</p>
          <Avatar letter={currentUser.firstName[0] + currentUser.lastName[0]} />
        </div>
      </div>
      <div className="py-8">
        <p className="inline-block bg-gray-100 font-bold text-xl rounded-full px-6 py-3">
          Your Balance: <span className="font-medium">${balance}</span>
        </p>
      </div>
      <div>
        <h3 className="font-bold text-xl mb-2">Users</h3>
        <Input
          prop={searchText}
          setProp={setSearchText}
          type="text"
          placeholder="Search users..."
        />
        <div className="flex flex-col gap-4 my-4">
          {users.map((user) => {
            return user._id === currentUser._id ? null : (
              <User
                key={user._id}
                firstName={user.firstName}
                lastName={user.lastName}
                receiverId={user._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
