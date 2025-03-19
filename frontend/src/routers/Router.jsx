import App from "@/App";
import { AddAgent } from "@/pages/dashboard/AddAgent";
import AgentTaskList from "@/pages/dashboard/AgentTaskList";
import Dashboard from "@/pages/dashboard/Dashboard";
import ManageAgents from "@/pages/dashboard/ManageAgents";
import { Login } from "@/pages/Login";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />

      {/* Dashboard Layout with Nested Routes */}
      <Route path="dashboard" element={<Dashboard />}>
        {/* Dashboard default display */}
        <Route index element={<ManageAgents />} />
        {/* Agent Routes */}
        <Route path="agents">
          <Route path="add" element={<AddAgent />} />
          <Route path="manage" element={<ManageAgents />} />
          <Route path="tasks" element={<AgentTaskList />} />
        </Route>

        {/* User Routes */}
        {/* <Route path="users">
          <Route index element={<ManageUsers />} />
          <Route path="add" element={<AddUser />} />
          <Route path="manage" element={<ManageUsers />} />
        </Route> */}
      </Route>
    </Route>
  )
);

export { router };
