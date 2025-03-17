const NoMessage = () => {
  return (
    <div className="min-h-[25rem] flex  justify-center items-center flex-col">
      <h2 className="text-3xl flex items-center">
        {" "}
        Hi! there, <span className="block animate-pulse">👋</span>{" "}
      </h2>
      <p className="opacity-50 mt-2">Welcome to synapse</p>
    </div>
  );
};

export { NoMessage };
