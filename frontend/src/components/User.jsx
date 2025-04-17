import Avatar from "./Avatar";

const User = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Avatar letter="U1" />
        <p className="font-semibold">User 1</p>
      </div>
      <button className="bg-black text-white cursor-pointer px-6 py-3 rounded-lg">
        Send Money
      </button>
    </div>
  );
};

export default User;
