import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Mail, Lock, User, Phone } from "lucide-react";

// Schema validation
const agentSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    mobile: z.string().regex(/^\+\d{1,3}\d{7,15}$/, "Invalid mobile number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmpassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

export const AddAgent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(agentSchema) });

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Agent added successfully!");
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-5xl mx-auto p-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-lg">Add Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {fields.map(
                ({
                  name,
                  icon: Icon,
                  type,
                  placeholder,
                  autoComplete,
                }) => (
                  <div key={name}>
                    <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                      <Icon className="text-gray-400 mr-2" size={18} />
                      <Input
                        type={type}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        {...register(name)}
                      />
                    </div>
                    {errors[name] && (
                      <p className="text-red-500 text-sm">
                        {errors[name]?.message}
                      </p>
                    )}
                  </div>
                )
              )}
              <Button type="submit" className="w-full">
                Add Agent
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Form fields array
const fields = [
  {
    name: "name",
    icon: User,
    type: "text",
    placeholder: "Enter agent's name",
    autoComplete: "name",
  },
  {
    name: "email",
    icon: Mail,
    type: "email",
    placeholder: "Enter agent's email",
    autoComplete: "email",
  },
  {
    name: "mobile",
    icon: Phone,
    type: "text",
    placeholder: "Ex. +91xxxxxxxx86",
    autoComplete: "tel",
  },
  {
    name: "password",
    icon: Lock,
    type: "password",
    placeholder: "Enter password",
    autoComplete: "new-password",
  },
  {
    name: "confirmpassword",
    icon: Lock,
    type: "password",
    placeholder: "Enter confirm password",
    autoComplete: "new-password",
  },
];
