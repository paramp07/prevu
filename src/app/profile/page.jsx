"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Camera,
  Utensils,
  Coffee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { verifyAuth } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { token, user } = useAuth();

  useEffect(() => {
    verifyAuth(token, router).finally(() => setLoading(false));
  }, [token, router]);


  const userStats = [
    {
      icon: Camera,
      count: 6,
      label: "Menus Scanned",
      color: "text-teal-600",
    },
    {
      icon: Utensils,
      count: 17,
      label: "Restaurants favorited",
      color: "text-teal-600",
    },
    {
      icon: Coffee,
      count: 42,
      label: "Menus saved",
      color: "text-teal-600",
    },
  ];

  return (
    <div className="min-h-screen max-w-md p-4 mx-auto">
      {/* Back Button */}
      <div className="mb-16 flex justify-between">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
        </Link>
        <h1 className="text-4xl font-bold text-primary font-vollkorn">prevu</h1>
        <Link
          href="/settings"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <IoEllipsisVertical className="w-6 h-6 mr-2" />
        </Link>
      </div>

      {/* Profile Header */}
      <div className="text-center mb-8">
        {/* Profile Picture */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <Image
            src="/userPlaceholder.svg?height=36&width=36"
            alt="Profile picture"
            width={96}
            height={96}
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {/* Name and Email */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="ml-4 text-2xl font-medium text-gray-900">
              {user.email}
            </h1>
            <Button variant="ghost" size="md" className="px-0 h-auto ">
              <FaEdit className="w-8 h-8 px-0 text-gray-400 " />
            </Button>
          </div>
          <p className="text-gray-500 text-sm">youremail@gmail.com</p>
        </div>

        {/* Stats */}
        <div className="mb-8 bg-neutral-200/80 py-3 rounded-2xl">
          <div className="grid grid-cols-3 gap-2 ">
            {userStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center flex flex-col gap-1">
                  <div className="flex justify-center">
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-medium text-gray-900">
                    {stat.count}
                  </div>
                  <div className="text-xs text-neutral-600 leading-tight">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Favorites Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Favorites</h2>

        {/* Empty State - You can replace this with actual favorites */}
        <div className="text-center py-12 text-gray-500">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Utensils className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-sm">No favorites yet</p>
          <p className="text-xs mt-1">
            Start exploring restaurants to add favorites
          </p>
        </div>
      </div>
    </div>
  );
}
