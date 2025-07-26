"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Settings,
  HelpCircle,
  User,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/logout", {
      method: "POST",
      credentials: "include", // IMPORTANT: send cookies with request
    });

    if (res.ok) {
      console.log("Logged out successfully");
      // Redirect to login or homepage
      router.push("/login");
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

  return (
    <div className="min-h-screen max-w-sm mx-auto p-4">
      {/* Back Button */}
      <div className="mb-16 flex justify-between">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
        </Link>
        <h1 className="text-4xl font-bold text-primary font-vollkorn">prevu</h1>
        <span className="text-transparent">gggg</span>
      </div>

      {/* App Settings Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-4 h-4 text-gray-400" />
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            App Settings
          </h2>
        </div>

        <div className="space-y-4">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-900 font-medium">Dark mode</span>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
              className=" data-[state=checked]:bg-teal-600"
            />
          </div>

          {/* Language Option */}
          <Link
            href="/settings/language"
            className="flex items-center justify-between py-2 hover:bg-gray-50 -mx-2 px-2 rounded-lg"
          >
            <span className="text-gray-900 font-medium">Language</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        </div>
      </div>

      {/* Help Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-4 h-4 text-gray-400" />
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            Help
          </h2>
        </div>

        <div className="space-y-4">
          <Link
            href="/privacy-policy"
            className="flex items-center justify-between py-2 hover:bg-gray-50 -mx-2 px-2 rounded-lg"
          >
            <span className="text-gray-900 font-medium">Privacy Policy</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>

          <Link
            href="/terms"
            className="flex items-center justify-between py-2 hover:bg-gray-50 -mx-2 px-2 rounded-lg"
          >
            <span className="text-gray-900 font-medium">
              Terms of Conditions
            </span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        </div>
      </div>

      {/* Account Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-gray-400" />
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            Account
          </h2>
        </div>

        <div className="space-y-4">
          <Link
            href="/settings/change-password"
            className="flex items-center justify-between py-2 hover:bg-gray-50 -mx-2 px-2 rounded-lg"
          >
            <span className="text-gray-900 font-medium">Change password</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>

          <Link
            href="/settings/change-name"
            className="flex items-center justify-between py-2 hover:bg-gray-50 -mx-2 px-2 rounded-lg"
          >
            <span className="text-gray-900 font-medium">Change name</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <Button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-full font-medium"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
