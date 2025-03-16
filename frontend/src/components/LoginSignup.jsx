import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, Phone } from "lucide-react";

// ✅ Zod Schema for Validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^\+\d{1,3}\d{7,15}$/, "Invalid mobile number (ex. +91xxxxxx58)"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export const LoginSignup = ({ onSubmit }) => {
  const [tab, setTab] = useState("login");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tab === "login" ? loginSchema : signupSchema),
  });

  useEffect(() => {
    reset();
  }, [tab, reset]);

  return (
    <Tabs
      value={tab}
      onValueChange={setTab}
      className="w-full max-w-md mx-auto border p-2 rounded-xl shadow-md shadow-gray-400 bg-blue-200"
    >
      <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-lg p-1 cursor-pointer">
        <TabsTrigger className="cursor-pointer" value="login">Login</TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="signup">Sign Up</TabsTrigger>
      </TabsList>

      {/* LOGIN FORM */}
      <TabsContent value="login">
        <Card className="shadow-lg">
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
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* SIGNUP FORM */}
      <TabsContent value="signup">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-lg">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <User className="text-gray-400 mr-2" size={18} />
                <Input
                  placeholder="Enter your full name"
                  autoComplete="name"
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

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
                <Phone className="text-gray-400 mr-2" size={18} />
                <Input
                  placeholder="Ex. +91xxxxxx58"
                  autoComplete="tel"
                  {...register("mobile")}
                />
              </div>
              {errors.mobile && (
                <p className="text-red-500 text-sm">{errors.mobile.message}</p>
              )}

              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <Lock className="text-gray-400 mr-2" size={18} />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <CardFooter className="flex justify-end">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
