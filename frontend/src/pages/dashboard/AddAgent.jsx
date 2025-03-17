import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Mail, Lock, User, Phone, Loader2 } from "lucide-react";
import { useRegisterUserMutation } from "@/redux/api/authUserApi";
import { useEffect } from "react";

// Schema validation
const agentSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    mobile: z.string().regex(/^\+\d{1,3}\d{7,15}$/, "Invalid mobile number"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    confirmpassword: z
      .string()
      .min(4, "Confirm Password must be at least 4 characters"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

export const AddAgent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(agentSchema) });

  // Login API Call
  const [registerUser, { data, isSuccess, error, isLoading }] =
    useRegisterUserMutation();

  const onSubmit = async (formInput) => {
    await registerUser(formInput);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        data?.message || "Agent successfully created and added to the system"
      );
      // reset();
    } else if (error) {
      alert(error?.data?.message || "Please try again");
    }
  }, [error, isSuccess]);

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
                ({ name, icon: Icon, type, placeholder, autoComplete }) => (
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
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 duration-300 ease-in-out cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex gap-2 items-center justify-center">
                    <Loader2 className="animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Submit"
                )}
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
