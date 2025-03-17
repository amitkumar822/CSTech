import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div className="fixed w-full flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-scroll pb-15">
        <Outlet />
      </div>
    </div>
  );
}
