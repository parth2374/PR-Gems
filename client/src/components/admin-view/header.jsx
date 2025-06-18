import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {

	const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

	return (
		<header className=" w-full flex items-center justify-between px-4 py-3 bg-background border-b">
			<Button variant='ghost' onClick={() => setOpen(true)} className="lg:hidden sm:block">
				<AlignJustify />
				<span className="sr-only">Toggle Menu</span>
			</Button>
			<div className="flex flex-1 justify-end">
				<button
					onClick={handleLogout}
					class="inline-flex cursor-pointer gap-2 items-center rounded-sm hover:rounded-full transition-all duration-300 ease-in-out will-change-[border-radius] px-6 bg-[#00ED64] border border-[#000] py-3 text-sm font-medium"

				>
					<LogOut />
					Logout
				</button>
			</div>
		</header>
	);
}

export default AdminHeader;