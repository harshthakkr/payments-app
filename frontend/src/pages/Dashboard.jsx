import { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import Input from "../components/Input";
import User from "../components/User";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState({ firstName: "", lastName: "" });
  const [balance, setBalance] = useState("");
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token").split(" ")[1];
      const decoded = jwtDecode(token);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/?id=${decoded.id}`
      );
      const getBalance = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/account/balance`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const getUsers = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/all`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setBalance(getBalance.data.balance);
      setUser(res.data.user);
      setUsers(getUsers.data.users);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const id = setTimeout(async () => {
      const filteredUsers = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/user/bulk?filter=${searchText}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setUsers(filteredUsers.data.matchingUsers);
    }, 300);
    return () => clearTimeout(id);
  }, [searchText]);
  return (
    <div className="px-28 py-8">
      <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2">
        <h1 className="text-3xl font-bold">Payments App</h1>
        <div className="flex items-center gap-4">
          <p className="font-medium text-lg">Hello, {user.firstName}</p>
          <Avatar letter={user.firstName[0] + user.lastName[0]} />
        </div>
      </div>
      <div className="py-8">
        <p className="font-bold text-xl">
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
            return (
              <User
                key={user._id}
                firstName={user.firstName}
                lastName={user.lastName}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
