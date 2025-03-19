import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ChevronDown, Briefcase } from "lucide-react";
import { sidebarData } from "./DeskTopSidebar";
import Logout from "@/components/Logout";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  // Toggle Sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close Sidebar when clicking a menu item
  const closeSidebar = () => setIsOpen(false);

  // Toggle Submenu
  const toggleSubMenu = (index) =>
    setActiveMenu(activeMenu === index ? null : index);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-2 right-4 z-50 p-2 bg-gray-900 text-white rounded-full shadow-lg cursor-pointer"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar Overlay (Closes when clicked) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white text-gray-900 z-50 shadow-lg border-r border-gray-300 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-300">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-500" />
            <h1 className="text-sm font-bold">
              <span className="text-blue-600">CS</span>
              <span className="text-green-500">Tech</span>
              <span className="text-gray-800"> Admin Hub</span>
            </h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-200 rounded-full transition-all duration-200 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="p-4">
          {sidebarData.map((item, index) => (
            <div key={index}>
              <Link
                to={item?.subItems ? "#" : item.link}
                onClick={() => {
                  if (!item.subItems) closeSidebar();
                  toggleSubMenu(index);
                }}
                className="flex items-center p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer transition-all duration-200"
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
                {item.subItems && (
                  <ChevronDown
                    className={`ml-auto transform transition-transform ${
                      activeMenu === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>

              {activeMenu === index && item.subItems && (
                <div className="pl-6 mt-2 space-y-2 transition-all duration-200 overflow-hidden">
                  {item.subItems.map((subItem, subIndex) => (
                    <NavLink
                      to={subItem.link}
                      key={subIndex}
                      className="flex items-center p-2 bg-gray-50 hover:bg-gray-200 rounded cursor-pointer transition-all duration-200"
                      onClick={closeSidebar}
                    >
                      {subItem.icon}
                      <span className="ml-3">{subItem.title}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-2">
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
