import Avatar from "./Avatar";
import Input from "./Input";

const SendMoney = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="min-w-[448px] shadow-2xl rounded-2xl p-12">
        <h1 className="font-bold text-3xl text-center mb-12">Send Money</h1>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center bg-zinc-200 p-3 rounded-lg">
            <Avatar letter="H" />
            <p className="font-semibold text-lg">Harsh Thakkar</p>
          </div>
          <form className="flex flex-col gap-3">
            <Input label="Amount (in USD)" type="number" placeholder="eg.15" />
            <button className="bg-green-600 text-white cursor-pointer rounded-sm py-2">
              Initiate Transfer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
