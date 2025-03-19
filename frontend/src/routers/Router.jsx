import App from "@/App";
import { AddAgent } from "@/pages/dashboard/AddAgent";
import AgentTaskList from "@/pages/dashboard/AgentTaskList";
import Dashboard from "@/pages/dashboard/Dashboard";
import ManageAgents from "@/pages/dashboard/ManageAgents";
import Home from "@/pages/Home";
import { Login } from "@/pages/Login";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />

      {/* ✅ Prevent logged-in users from accessing login */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* ✅ Protect Dashboard Route (Only Admin Can Access) */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<ManageAgents />} />
          <Route path="agents">
            <Route path="add" element={<AddAgent />} />
            <Route path="manage" element={<ManageAgents />} />
            <Route path="tasks" element={<AgentTaskList />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

export { router };
