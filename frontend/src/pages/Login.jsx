import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";

// Zod Schema for Validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center mx-auto no-underline fixed bg-gradient-to-r from-teal-400 to-gray-800">
        <Card className="w-full max-w-md mx-auto border-2 z-10 bg-gradient-to-r from-teal-400 to-yellow-200">
          <CardHeader>
            <CardTitle className="text-center text-lg">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <Mail className="text-gray-400 mr-2" size={18} />
                <Input
                  placeholder="Enter your email"
                  autoComplete="email"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <Lock className="text-gray-400 mr-2" size={18} />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <CardFooter className="flex justify-end">
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 duration-300"
                >
                  Login
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>

        {/* Animation pattern. */}
        <Animation />
      </div>
    </div>
  );
};

const Animation = () => {
  return (
    <>
      <div className="circles">
        <div className="circle text-white text-center"></div>
        <div className="circle text-white text-center"></div>
        <div className="circle text-white text-center"></div>
        <div className="circle text-white text-center"></div>
        <div className="circle text-white text-center"></div>
        <div className="circle text-white text-center"></div>
        <div className="circle text-white text-center"></div>
        <div className="circle text-white text-center"></div>
        <div className="circle text-white text-center"></div>
        <div className="circle text-white text-center"></div>
      </div>
    </>
  );
};
