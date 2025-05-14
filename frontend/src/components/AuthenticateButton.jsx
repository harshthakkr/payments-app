const AuthenticateButton = ({ text }) => {
  return (
    <button className="cursor-pointer bg-black text-white rounded-md py-3 mt-4">
      {text}
    </button>
  );
};

export default AuthenticateButton;
