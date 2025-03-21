import { useEffect, useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUploadTaskMutation } from "@/redux/api/agentTaskApi";
import { toast } from "react-toastify";
import { Link } from "react-router";

export default function UploadTaskPage() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    validateFile(uploadedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    validateFile(droppedFile);
  };

  const validateFile = (uploadedFile) => {
    if (uploadedFile) {
      const validFormats = ["csv", "xlsx", "xls"];
      const fileExtension = uploadedFile.name.split(".").pop().toLowerCase();
      if (validFormats.includes(fileExtension)) {
        setFile(uploadedFile);
        setError("");
      } else {
        setError(
          "Invalid file format. Please upload a CSV, XLSX, or XLS file."
        );
        setFile(null);
      }
    }
  };

  const handleDragOver = async (e) => {
    e.preventDefault();
  };

  const handleClearFile = () => {
    setFile(null);
    setError("");
  };

  //Call API and Upload a file to the server
  const [uploadTask, { isSuccess, isLoading, error: fileUploadError, data }] =
    useUploadTaskMutation();

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      await uploadTask(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Successfull upload file");
      handleClearFile();
    } else if (fileUploadError) {
      toast.error(fileUploadError?.data?.message || "Faild to upload");
    }
  }, [fileUploadError, isSuccess]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Upload className="text-blue-500" size={24} /> Upload Task File
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="border border-dashed border-gray-400 p-6 rounded-lg text-center flex flex-col items-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="text-gray-500 mb-2" size={32} />
              <span className="text-gray-600">Click or Drag to Upload</span>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {file && (
            <div className="mt-4 flex justify-between items-center border p-2 rounded-lg">
              <span className="text-gray-700">{file.name}</span>
              <Button variant="destructive" size="sm" onClick={handleClearFile}>
                <Trash2 size={16} />
              </Button>
            </div>
          )}

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <Button
            onClick={handleSubmit}
            className="w-full mt-4 cursor-pointer"
            disabled={!file || isLoading}
          >
            Upload File
          </Button>
          <Link to="/dashboard/agents/tasks">
            <Button className="w-full mt-4 flex items-center gap-2 cursor-pointer text-white bg-blue-600 hover:bg-blue-700 transition-all">
              Check Tasks List
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
