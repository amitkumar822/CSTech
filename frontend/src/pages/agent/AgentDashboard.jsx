import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Phone, User } from "lucide-react";

export default function AgentDashboard() {
  // Dummy agent details
  const agent = {
    name: "Rohan Kumar",
    email: "rohan@gmail.com",
    mobile: "+917228843871",
  };

  // Dummy tasks assigned to the agent
  const tasks = [
    { _id: "1", firstName: "John", phone: "9876543210", notes: "Follow-up on project X" },
    { _id: "2", firstName: "Sophia", phone: "4321098765", notes: "Schedule meeting for proposal" },
    { _id: "3", firstName: "Alice", phone: "8765432109", notes: "Client feedback required" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agent Dashboard</h1>

      {/* Agent Details */}
      <Card className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <User className="text-blue-500" size={20} /> {agent.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 flex items-center gap-2">
            <Mail className="text-red-500" size={16} />
            <a href={`mailto:${agent.email}`} className="text-blue-600 hover:underline">
              {agent.email}
            </a>
          </p>
          <p className="text-gray-600 flex items-center gap-2 mt-2">
            <Phone className="text-green-500" size={16} />
            <a href={`tel:${agent.mobile}`} className="text-green-600 hover:underline">
              {agent.mobile}
            </a>
          </p>
        </CardContent>
      </Card>

      {/* Assigned Tasks */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Your Assigned Tasks</CardTitle>
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
                    <a href={`tel:${task.phone}`} className="text-blue-600 hover:underline">
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
    </div>
  );
}
