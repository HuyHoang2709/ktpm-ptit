const Title = ({ text, className = "" }) => {
  return (
    <h1 className={`text-2xl font-bold text-center ${className}`}>{text}</h1>
  );
};

export default Title;
