import { Outlet } from "react-router-dom";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { useState } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex h-screen w-full /* overflow-hidden */">
      {/* Sticky Sidebar */}
      <div className="h-full">
        <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
      </div>

      {/* Scrollable Content Area */}
      <div className="flex flex-1 flex-col /* overflow-hidden */">
        {/* Header (fixed height) */}
        <AdminHeader setOpen={setOpenSidebar} />

        {/* Main content scrollable */}
        <main className="flex-1 overflow-auto bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
