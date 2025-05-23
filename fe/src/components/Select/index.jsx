const Select = ({ options, value, onChange, placeholder }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-slate-200 rounded-lg py-2 px-4"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
