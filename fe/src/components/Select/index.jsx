const Select = ({ options, value, onChange = () => {} }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="border border-slate-300 outline-0 rounded-lg py-2 px-4"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
