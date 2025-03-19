import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  useDeleteAgentMutation,
  useGetAllAgentsQuery,
} from "@/redux/api/authUserApi";
import DeleteClassModal from "@/components/DeleteClassModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Loading from "@/components/Loading";

export default function ManageAgents() {
  // Fetch all agents
  const { data: agents, isLoading } = useGetAllAgentsQuery();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteAgentId, setDeleteAgentId] = useState("");

  const [deleteAgent, { data, error, isLoading: deleteIsLoading, isSuccess }] =
    useDeleteAgentMutation();

  // Delete agent function
  const handleDelete = async () => {
    await deleteAgent(deleteAgentId);
    setDeleteModalOpen(false);
    setDeleteAgentId("");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Delete Agent Successfull");
    } else if (error) {
      toast.error(error?.data?.message || "Delete failed");
    }
  }, [error, isSuccess]);

  //^ Edit Agent and send data on add agent form help of navigation
  const navigate = useNavigate();
  const handleEdit = (agent) => {
    navigate("/dashboard/agents/add", { state: { agent } }); // Pass data via state
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Agents</h2>

      <div className="overflow-auto bg-white rounded-lg shadow-md">
        {isLoading ? (
          <Loading />
        ) : (
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">Sr. No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead className="w-32 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {agents?.length > 0 ? (
                agents?.map((agent, index) => (
                  <TableRow key={agent._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{agent.name}</TableCell>
                    <TableCell>
                      <a
                        href={`mailto:${agent.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {agent.email}
                      </a>
                    </TableCell>
                    <TableCell>
                      <a
                        href={`tel:${agent.mobile.replace(/\s+/g, "")}`}
                        className="text-green-600 hover:underline"
                      >
                        {agent.mobile}
                      </a>
                    </TableCell>
                    <TableCell>
                      {new Date(agent.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(agent)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setDeleteModalOpen(true);
                          setDeleteAgentId(agent._id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No agents found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Agent Delete Model */}
      <div>
        <DeleteClassModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
          message={"Agent"}
          isPending={deleteIsLoading}
        />
      </div>
    </div>
  );
}
