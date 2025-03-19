import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useGetAgentTaskByIdQuery,
  useMarkTaskAsCompletedMutation,
} from "@/redux/api/agentTaskApi";
import { CheckCircle, Mail, Phone, User, XCircle } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AgentDashboard() {
  // Get agent information from Redux state
  const { user: agent } = useSelector((state) => state.auth);

  // Get agent tasks from the database
  const {data: tasks} = useGetAgentTaskByIdQuery(agent?._id);

  // Mutation for marking a task as completed
  const [markTaskAsCompleted] = useMarkTaskAsCompletedMutation();

  const handleMarkTask = async (agentTaskId) => {
    await markTaskAsCompleted(agentTaskId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agent Dashboard</h1>

      {/* Agent Details */}
      <Card className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <User className="text-blue-500" size={20} /> {agent?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 flex items-center gap-2">
            <Mail className="text-red-500" size={16} />
            <a
              href={`mailto:${agent?.email}`}
              className="text-blue-600 hover:underline"
            >
              {agent?.email}
            </a>
          </p>
          <p className="text-gray-600 flex items-center gap-2 mt-2">
            <Phone className="text-green-500" size={16} />
            <a
              href={`tel:${agent?.mobile}`}
              className="text-green-600 hover:underline"
            >
              {agent?.mobile}
            </a>
          </p>
        </CardContent>
      </Card>

      {/* Assigned Tasks */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Your Assigned Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr. No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Mark</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks?.map((task, index) => (
                <TableRow key={task._id}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{task.firstName}</TableCell>
                  <TableCell>
                    <a
                      href={`tel:${task.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {task.phone}
                    </a>
                  </TableCell>
                  <TableCell>{task.notes}</TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>
                        {task.completed ? (
                          <CheckCircle
                            className="text-green-600 cursor-pointer"
                            size={20}
                          />
                        ) : (
                          <XCircle
                            className="text-red-500 cursor-pointer"
                            size={20}
                          />
                        )}
                      </TooltipTrigger>
                      <TooltipContent>
                        {task.completed
                          ? "Task Completed"
                          : "Task Not Completed"}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      className={`${
                        task.completed
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white cursor-pointer`}
                      onClick={() => handleMarkTask(task._id)}
                    >
                      {task.completed ? "Mark Incomplete" : "Mark Complete"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
