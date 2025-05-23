const Button = ({ children, onClick, type, variants }) => {
  let styles = "";
  if (variants == "primary") {
    styles = "bg-blue-500 hover:bg-blue-600 text-white";
  }
  if (variants == "secondary") {
    styles = "bg-slate-200";
  }

  return (
    <button
      className={`py-2 px-4 rounded-lg cursor-pointer ${styles}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
