import { useLocation, useNavigate } from "react-router";
import Avatar from "../components/Avatar";
import Input from "../components/Input";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import NonAuthorizationMessage from "../components/NonAuthorizationMessage";

const SendMoney = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { firstName, lastName, receiverId } = location.state || {};
  const [amount, setAmount] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/account/transfer`,
        {
          to: receiverId,
          amount,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success(res.data.msg);
      setAmount("");
    } catch (e) {
      toast.error(e.response.data.msg);
    } finally {
      navigate("/dashboard");
    }
  };

  return !firstName || !receiverId ? (
    <NonAuthorizationMessage />
  ) : (
    <div className="min-h-screen flex justify-center items-center">
      <div className="min-w-[448px] shadow-2xl rounded-2xl p-12">
        <h1 className="font-bold text-3xl text-center mb-12">Send Money</h1>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center bg-gray-100 p-3 rounded-lg">
            <Avatar letter={firstName.charAt(0) + lastName.charAt(0)} />
            <p className="font-semibold text-lg">
              {firstName} {lastName}
            </p>
          </div>
          <form
            onSubmit={(e) => handleTransfer(e)}
            className="flex flex-col gap-3"
          >
            <Input
              prop={amount}
              setProp={setAmount}
              label="Amount (in USD)"
              type="number"
              placeholder="eg.15"
              min="0"
            />
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
