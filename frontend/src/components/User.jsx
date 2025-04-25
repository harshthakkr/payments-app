import { useNavigate } from "react-router";
import Avatar from "./Avatar";

const User = ({ firstName, lastName, receiverId }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/send", {
      state: {
        firstName,
        lastName,
        receiverId,
      },
    });
  };
  return (
    <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-2xl">
      <div className="flex items-center gap-4">
        <Avatar letter={firstName[0] + lastName[0]} />
        <p className="font-semibold">{`${firstName} ${lastName}`}</p>
      </div>
      <button
        onClick={handleClick}
        className="bg-black text-white cursor-pointer px-6 py-3 rounded-lg"
      >
        Send Money
      </button>
    </div>
  );
};

export default User;
