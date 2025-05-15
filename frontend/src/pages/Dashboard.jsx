import { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import Input from "../components/Input";
import User from "../components/User";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Message from "../components/Message";

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
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
      setUsers(res.data.matchingUsers);
    }, 300);
    return () => clearTimeout(id);
  }, [searchText]);

  if (!isAuthorized) {
    return (
      <Message text="You're not authorized to access this page, please signup/signin." />
    );
  } else {
    return isLoading ? (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    ) : (
      <div className="px-4 py-2 sm:px-14 sm:py-4 md:px-28 md:py-8">
        <div className="flex justify-between items-center gap-4 border-b-2 border-gray-300 pb-2">
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold">
            Payments App
          </h1>
          <div className="flex items-center gap-2 md:gap-4">
            <p className="font-medium sm:text-lg">
              Hello, {currentUser.firstName}
            </p>
            <Avatar
              letter={currentUser.firstName[0] + currentUser.lastName[0]}
            />
          </div>
        </div>
        <div className="py-8 flex flex-col xs:block text-center xs:text-left">
          <p className="inline-block bg-gray-100 font-medium text-xl rounded-full px-6 py-3">
            Your Balance: <span className="font-bold">${balance}</span>
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
          {users.length === 0 ? (
            <div className="text-center mt-12 text-lg">User not found!</div>
          ) : (
            <div className="flex flex-col gap-4 my-6 md:my-8 sm:p-4 md:p-8 sm:border-l-3 sm:border-b-3 sm:border-r-3 rounded-b-2xl md:rounded-b-4xl">
              {users.map((user) => {
                return user._id === currentUser._id ? null : (
                  <User
                    key={user._id}
                    username={user.username}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    receiverId={user._id}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Dashboard;
