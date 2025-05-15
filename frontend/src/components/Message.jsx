const Message = ({ text }) => {
  return (
    <div className="h-screen bg-gray-800 text-white flex justify-center items-center">
      <h2 className="text-xl md:text-2xl tracking-wide text-center text-gray-100 mx-4">
        {text}
      </h2>
    </div>
  );
};

export default Message;
