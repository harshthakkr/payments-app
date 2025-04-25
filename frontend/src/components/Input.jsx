const Input = ({ prop, setProp, label, type, placeholder, min }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold">{label}</label>
      <input
        className="block border-1 border-gray-300 rounded-sm px-4 py-2"
        value={prop}
        onChange={(e) => {
          type === "number"
            ? setProp(+e.target.value)
            : setProp(e.target.value);
        }}
        type={type}
        placeholder={placeholder}
        min={min}
      ></input>
    </div>
  );
};

export default Input;
