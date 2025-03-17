import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Mail, Lock, User, Phone, Loader2 } from "lucide-react";
import {
  useRegisterUserMutation,
  useUpdateUserOrAgentMutation,
} from "@/redux/api/authUserApi";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const location = useLocation(); // Get state from navigation
  const agentToEdit = location.state?.agent || null; // Check if editing

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: agentToEdit || {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmpassword: "",
    },
  });

  const [registerUser, { data, isSuccess, error, isLoading }] =
    useRegisterUserMutation();

  //^Agent Update or Edit API Call
  const [
    updateUserOrAgent,
    {
      data: updatedData,
      isSuccess: isUpdateSuccess,
      error: updateError,
      isLoading: isUpdateLoading,
    },
  ] = useUpdateUserOrAgentMutation();

  const onSubmit = async (formInput) => {
    if (agentToEdit) {
      // update an existing agent
      const agentId = agentToEdit._id;
      const editFormInput = {
        name: formInput.name,
        email: formInput.email,
        mobile: formInput.mobile,
      };
      await updateUserOrAgent({ editFormInput, agentId });
    } else {
      // create a new agent
      await registerUser(formInput);
    }
  };

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      toast.success(
        data?.message ||
        updatedData?.message ||
          "Agent successfully created and added to the system"
      );
      reset();
      if (isUpdateSuccess) {
        navigate("/dashboard/agents/manage");
      }
    } else if (error || updateError) {
      alert(
        error?.data?.message || updateError?.data?.message || "Please try again"
      );
    }
  }, [error, isSuccess, isUpdateSuccess, updateError]);

  //^ set edit agent data in form input
  useEffect(() => {
    if (agentToEdit) {
      reset(agentToEdit);
    }
  }, [agentToEdit, reset]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {agentToEdit ? "Edit Agent" : "Add Agent"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <User className="text-gray-400 mr-2" size={18} />
              <Input
                type="text"
                placeholder="Enter agent's name"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <Mail className="text-gray-400 mr-2" size={18} />
              <Input
                type="email"
                placeholder="Enter agent's email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <Phone className="text-gray-400 mr-2" size={18} />
              <Input
                type="text"
                placeholder="Ex. +91xxxxxxxx86"
                {...register("mobile")}
              />
            </div>
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile.message}</p>
            )}
          </div>

          {!agentToEdit && (
            <>
              <div>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                  <Lock className="text-gray-400 mr-2" size={18} />
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...register("password")}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                  <Lock className="text-gray-400 mr-2" size={18} />
                  <Input
                    type="password"
                    placeholder="Enter confirm password"
                    {...register("confirmpassword")}
                  />
                </div>
                {errors.confirmpassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmpassword.message}
                  </p>
                )}
              </div>
            </>
          )}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {agentToEdit ? "Update Agent" : "Add Agent"}
          </Button>
        </form>
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
