import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllAgentTasksQuery } from "@/redux/api/agentTaskApi";
import Loading from "@/components/Loading";

export default function AgentTaskList() {
  const { data: tasks, isLoading } = useGetAllAgentTasksQuery();

  if (isLoading) return <Loading />;
  return (
    <div className="w-full max-w-8xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Agent Task List ({tasks?.length})
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tasks?.map(({ agent, tasks }) => (
          <Card key={agent._id} className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {agent.name}
              </CardTitle>
              <p className="md:text-sm text-xs flex md:gap-4 gap-1">
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
    </div>
  );
}
