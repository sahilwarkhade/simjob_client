const Logo = () => (
    <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center relative -z-10">
        <div className="w-[45px] h-[45px] bg-white rounded-full absolute left-[15px]"></div>
    </div>
);


const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center !p-4">
      <div className="max-w-md w-full mx-auto">
        <div className="flex flex-col items-center !mb-6">
            <Logo />
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-500 !mt-2">{subtitle}</p>
        </div>
        <div className="bg-white !p-8 max-sm:!p-6 rounded-xl shadow-md !space-y-3 max-sm:!space-y-2">
            {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;