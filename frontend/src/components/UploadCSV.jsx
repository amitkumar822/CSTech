import { useState } from "react";
import * as XLSX from "xlsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

export default function UploadCSV() {
  const [data, setData] = useState([]);
  const [distributedData, setDistributedData] = useState([]);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validFormats = ["csv", "xlsx", "xls"];
    const fileExt = file.name.split(".").pop().toLowerCase();
    if (!validFormats.includes(fileExt)) {
      toast.error("Invalid file format. Upload CSV, XLSX, or XLS only.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      // Validate required fields
      const isValid = parsedData.every(
        (row) => "FirstName" in row && "Phone" in row && "Notes" in row
      );
      if (!isValid) {
        toast.error(
          "Invalid file format. Ensure it has FirstName, Phone, and Notes columns."
        );
        return;
      }

      setData(parsedData);
      distributeData(parsedData);
    };
    reader.readAsBinaryString(file);
  };

  // Distribute tasks equally among 5 agents
  const distributeData = (parsedData) => {
    const numAgents = 5;
    const distributed = Array.from({ length: numAgents }, () => []);

    parsedData.forEach((item, index) => {
      const agentIndex = index % numAgents;
      distributed[agentIndex].push(item);
    });

    setDistributedData(distributed);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-center">
            Upload CSV & Distribute
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
          />
          <Button
            className="mt-4 w-full"
            onClick={() => toast.success("File processed successfully!")}
          >
            Process File
          </Button>
        </CardContent>
      </Card>

      {distributedData.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Distributed Lists</h2>
          {distributedData.map((list, index) => (
            <Card key={index} className="mt-4">
              <CardHeader>
                <CardTitle>Agent {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                {list.length > 0 ? (
                  <ul>
                    {list.map((item, i) => (
                      <li key={i} className="border-b py-2">
                        {item.FirstName} - {item.Phone} - {item.Notes}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No items assigned.</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
