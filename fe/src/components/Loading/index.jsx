const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="w-20 h-20 border-[12px] border-blue-500 border-t-white rounded-[50%] animate-spin"></div>
      <p className="font-semibold text-lg text-blue-500">Loading...</p>
    </div>
  );
};

export default Loading;
