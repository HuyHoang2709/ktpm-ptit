const Input = ({ id, type, placeholder, value, onChange }) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder || ""}
      value={value}
      onChange={onChange}
      className="border border-slate-200 outline-blue-300 rounded-lg py-2 px-4"
    />
  );
};

export default Input;
