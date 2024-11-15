const Box = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <main className="flex flex-col items-center my-10 px-2">
      <div className="sm:w-[500px] w-full">
        <p className="text-3xl font-black text-header_blue mb-5">{title}</p>
        <div className="shadow-lg border-2 border-header_blue rounded-lg px-5 py-10   flex flex-col ">
          <div className="flex flex-col gap-6">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default Box;
