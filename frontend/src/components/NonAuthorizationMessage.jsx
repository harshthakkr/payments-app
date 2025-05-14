const NonAuthorizationMessage = () => {
  return (
    <div className="h-screen bg-gray-800 text-white flex justify-center items-center">
      <h2 className="text-2xl tracking-wide text-gray-100">
        You&apos;re not authorized to access this page, please signup/signin.
      </h2>
    </div>
  );
};

export default NonAuthorizationMessage;
