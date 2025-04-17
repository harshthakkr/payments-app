import Avatar from "../components/Avatar";
import Input from "../components/Input";
import User from "../components/User";

const Dashboard = () => {
  return (
    <div className="px-28 py-8">
      <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2">
        <h1 className="text-3xl font-bold">Payments App</h1>
        <div className="flex items-center gap-4">
          <p className="font-medium text-lg">Hello, User</p>
          <Avatar letter="U" />
        </div>
      </div>
      <div className="py-8">
        <p className="font-bold text-xl">
          Your Balance: <span className="font-medium">$500</span>
        </p>
      </div>
      <div>
        <h3 className="font-bold text-xl mb-2">Users</h3>
        <Input type="text" placeholder="Search users..." />
        <div className="flex flex-col gap-4 my-4">
          <User />
          <User />
          <User />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
