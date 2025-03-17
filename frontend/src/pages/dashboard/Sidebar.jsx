import React, { useState } from "react";
import {
  Users,
  ChevronLeft,
  ChevronRight,
  User,
  UserPlus,
  ClipboardList,
} from "lucide-react";
import { Link, NavLink } from "react-router";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Toggle submenu
  const toggleSubMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <div
      className={`h-screen overflow-auto pb-5 transition-all duration-300 border-r-2 shadow-md shadow-gray-800 dark:bg-gray-900 ${
        isCollapsed ? "w-20" : "w-[16.5rem]"
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!isCollapsed && (
          <h1 className="text-xl font-bold">CSTech Dashboard</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-blue-700 rounded transition-all duration-200 cursor-pointer"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className="p-4">
        {sidebarData.map((item, index) => (
          <div key={index}>
            <Link
              to={item?.subItems ? "#" : item.link}
              onClick={() => toggleSubMenu(index)}
              className={`dark:text-white
               flex items-center p-2 hover:bg-gray-200 my-1 rounded cursor-pointer transition-all duration-200`}
            >
              {item.icon}
              {!isCollapsed && <span className="ml-3">{item.title}</span>}
            </Link>
            {!isCollapsed && activeMenu === index && item.subItems && (
              <div className="pl-8 mt-2 space-y-1">
                {item.subItems.map((subItem, subIndex) => (
                  <NavLink
                    to={subItem.link}
                    key={subIndex}
                    className={({ isActive }) =>
                      `dark:text-white flex items-center p-2 hover:bg-gray-200 rounded cursor-pointer transition-all duration-200 ${
                        isActive ? "bg-gray-300" : ""
                      }`
                    }
                  >
                    {subItem.icon}
                    <span className="ml-3">{subItem.title}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

// Sidebar data in JSON format for easy management
export const sidebarData = [
  {
    title: "Agents",
    icon: <Users className="w-5 h-5" />,
    link: "/dashboard/agents",
    subItems: [
      {
        title: "Add Agent",
        icon: <UserPlus className="w-4 h-4" />,
        link: "/dashboard/agents/add",
      },
      {
        title: "Manage Agents",
        icon: <ClipboardList className="w-4 h-4" />,
        link: "/dashboard/agents/manage",
      },
    ],
  },
  {
    title: "Users",
    icon: <Users className="w-5 h-5" />,
    link: "/dashboard/users",
    subItems: [
      {
        title: "Add User",
        icon: <UserPlus className="w-4 h-4" />,
        link: "/dashboard/users/add",
      },
      {
        title: "Manage Users",
        icon: <ClipboardList className="w-4 h-4" />,
        link: "/dashboard/users/manage",
      },
    ],
  },
];
