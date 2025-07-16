import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaApple as Apple, FaFacebook as Facebook } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen  flex flex-col items-center max-w-md mx-auto">
      {/* Header */}
      <div className="mb-18">
        <h1 className={`text-4xl font-bold text-primary font-vollkorn`}>
          prevu
        </h1>
      </div>

      {/* Main Illustration */}
      <div className="mb-8 w-full">
        <Image
          src="/homepage.png"
          alt="Food delivery illustration with character surrounded by food items"
          width={300}
          height={300}
          className="w-full h-auto"
        />
      </div>

      {/* Main Content */}
      <div className=" mb-8">
        <h2 className="text-3xl font-bold font-vollkorn  mb-4 leading-tight">
          Everything you need is in one place
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc augue
          massa, tristique nec mauris vel, vestibulum viverra neque.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col gap-3 mb-6">
        <Link href="/login">
          <Button className="w-full bg-primary/80 hover:bg-primary text-white py-5 rounded-full font-medium">
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button className="w-full border-gray-500 border-3 text-gray-700 py-5 rounded-full font-medium hover:bg-gray-50 bg-transparent">
            Register
          </Button>
        </Link>
      </div>

      {/* Divider */}
      <div className="flex items-center w-full mb-4">
        <div className="flex-1 border-t border-[#C8C8C8]"></div>
        <span className="px-4 text-[#C8C8C8] font-bold text-sm">OR</span>
        <div className="flex-1 border-t border-[#C8C8C8]"></div>
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
