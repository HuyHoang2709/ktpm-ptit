import { Link } from "react-router-dom";

const Button = ({
  children,
  onClick,
  type,
  variants,
  className = "",
  isLink = false,
  link = "",
  state = null,
}) => {
  let styles = "";
  if (variants == "primary") {
    styles = "bg-blue-500 hover:bg-blue-600 text-white";
  }
  if (variants == "secondary") {
    styles = "bg-slate-200";
  }
  if (variants == "add") {
    styles = "bg-green-600 hover:bg-green-700 text-white";
  }
  if (variants == "danger") {
    styles = "bg-red-500 hover:bg-red-600 text-white";
  }

  return isLink ? (
    <Link
      to={link}
      className={`py-2 px-4 rounded-md transition-all ${styles} ${className}`}
      state={state}
    >
      {children}
    </Link>
  ) : (
    <button
      className={`py-2 px-4 rounded-md transition-all cursor-pointer ${styles} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
