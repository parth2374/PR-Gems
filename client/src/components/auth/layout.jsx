import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-screen">
      <div className="hidden lg:flex items-center justify-center bg-black w-full">
        <img src='https://cdn.pixabay.com/photo/2024/08/12/10/45/ai-generated-8963392_640.png' className="w-full h-screen object-cover" />
      </div>
      <div className="relative flex w-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8 overflow-hidden overflow-x-hidden bg-[#1f1f47]">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;