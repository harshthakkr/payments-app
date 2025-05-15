import { useNavigate } from "react-router";
import Avatar from "./Avatar";
import sendIcon from "../assets/send.svg";

const User = ({ username, firstName, lastName, receiverId }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/send", {
      state: {
        username,
        firstName,
        lastName,
        receiverId,
      },
    });
  };
  return (
    <div className="flex justify-between items-center gap-4 bg-gray-100 px-4 py-2 rounded-2xl">
      <div className="flex items-center gap-4">
        <Avatar letter={firstName[0] + lastName[0]} />
        <div>
          <p className="font-semibold">{`${firstName} ${lastName}`}</p>
          <p className="text-sm font-light">{username}</p>
        </div>
      </div>
      <button
        onClick={handleClick}
        className="flex items-center gap-4 bg-black text-white cursor-pointer p-3 sm:px-6 sm:py-3 rounded-full sm:rounded-lg"
      >
        <span className="hidden sm:block">Send Money</span>
        <img src={sendIcon} />
      </button>
    </div>
  );
};

export default User;
