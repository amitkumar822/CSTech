import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader } from "lucide-react";
import { useGetAllAgentTasksQuery } from "@/redux/api/agentTaskApi";

export default function AgentTaskList() {
  const { data: tasks, isLoading } = useGetAllAgentTasksQuery();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agent Task List ({tasks?.length})</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="flex flex-col justify-center items-center">
            <Loader className="animate-spin" size={60} />
            <p className="text-center text-gray-600 text-lg animate-pulse">
              Loading tasks...
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks?.map(({ agent, tasks }) => (
            <Card key={agent._id} className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {agent.name}
                </CardTitle>
                <p className="text-sm flex gap-4">
                  <a
                    href={`mailto:${agent.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {agent.email}
                  </a>
                  <a
                    href={`tel:${agent.mobile}`}
                    className="text-green-600 hover:underline"
                  >
                    {agent.mobile}
                  </a>
                </p>
              </CardHeader>

              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task._id}>
                        <TableCell>{task.firstName}</TableCell>
                        <TableCell>
                          <a
                            href={`tel:${task.phone}`}
                            className="text-orange-400 hover:underline"
                          >
                            {task.phone}
                          </a>
                        </TableCell>
                        <TableCell>{task.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
