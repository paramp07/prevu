"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FaApple as Apple,
  FaFacebook as Facebook,
  FaArrowLeft as ArrowLeft,
} from "react-icons/fa";
import z from "zod";

const loginSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function LoginPage() {
  const router = useRouter();
  const { setToken, setUser } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password)
      return setError("Please enter both email and password");

    setError("");
    setMessage("Logging in...");

    try {
      const res = await fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username: email, password }).toString(),
      });

      const data = await res.json();
      if (!res.ok)
        return setMessage(`Login failed: ${data.detail || res.statusText}`);

      setToken(data.access_token);
      console.log("Token saved to localStorage");

      setMessage("Login successful!");
      setTimeout(() => {
        router.push("/upload");
      }, 50);

      
    } catch {
      setMessage("Server error during login");
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col max-w-md mx-auto">
      {/* Back Button */}
      <div className="mb-36 flex justify-between">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
        </Link>
        <h1 className={`text-4xl font-bold text-primary font-vollkorn`}>
          prevu
        </h1>
        <span className="text-transparent">gggg</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 font-vollkorn mb-2">
          Login
        </h1>
        <p className="text-black/50">Sign in to contribute using the app</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-gray-900 text-base font-medium"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-5 bg-gray-300/30 border-0 rounded-lg placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-teal-700"
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-gray-900 text-base font-medium"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-5 bg-gray-300/30 border-0 rounded-lg placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-teal-700"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary/80 hover:bg-primary text-white py-3 rounded-full font-medium mt-8"
        >
          Login
        </Button>
      </form>

      {/* Register Link */}
      <div className="text-center mb-8">
        <p className="text-gray-500">
          New user?{" "}
          <Link
            href="/register"
            className="text-primary/80 hover:text-primary font-medium "
          >
            Register Here
          </Link>
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center w-full mb-6">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-4 text-gray-400 text-sm">OR</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Social Login */}
      <div className="flex justify-center space-x-6">
        <button className="p-3 rounded-full bg-white hover:bg-gray-200 transition-colors">
          <Apple className="w-6 h-6 text-gray-700" />
        </button>
        <button className="p-3 rounded-full bg-white hover:bg-gray-200 transition-colors">
          <Facebook className="w-6 h-6 text-blue-600" />
        </button>
        <button className="p-3 rounded-full bg-white hover:bg-gray-200 transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
