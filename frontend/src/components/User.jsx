import Avatar from "./Avatar";

const User = ({ firstName, lastName }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Avatar letter={firstName[0] + lastName[0]} />
        <p className="font-semibold">{`${firstName} ${lastName}`}</p>
      </div>
      <button className="bg-black text-white cursor-pointer px-6 py-3 rounded-lg">
        Send Money
      </button>
    </div>
  );
};

export default User;
