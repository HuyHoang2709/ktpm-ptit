const Card = ({ children, className }) => {
  return (
    <div
      className={`bg-white border border-slate-200 rounded-lg p-6 ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
