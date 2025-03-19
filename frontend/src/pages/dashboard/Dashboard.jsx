import DeskTopSidebar from "../sidebar/DeskTopSidebar";
import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div className="fixed w-full flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:block">
        <DeskTopSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-scroll md:pb-15 pb-20">
        <Outlet />
      </div>
    </div>
  );
}
