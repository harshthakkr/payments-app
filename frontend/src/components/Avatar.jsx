const Avatar = ({ letter }) => {
  return (
    <span className="bg-gray-500 text-white h-10 w-10 sm:h-12 sm:w-12 text-xl rounded-full flex justify-center items-center">
      {letter}
    </span>
  );
};

export default Avatar;
