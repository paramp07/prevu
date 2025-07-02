"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";

function capitalizeWords(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function DishResults() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState({
    name: "Untitled",
    location: null,
  });

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const savedDishes = localStorage.getItem("finalDishes");
    const savedMeta = localStorage.getItem("restaurantMeta");

    if (savedDishes) {
      setDishes(JSON.parse(savedDishes));
    }

    if (savedMeta) {
      const meta = JSON.parse(savedMeta);
      setRestaurant({
        name: capitalizeWords(meta.name) || "Untitled",
        location: meta.location || null,
      });
    }

    setLoading(false);
  }, []);

  const handleDishClick = (dishId) => {
    const slug = restaurant.name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/dishes/${slug}/${dishId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-6">
            <Link href="/text-review">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 ml-4">
              Loading...
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-800">
                {restaurant.name}
              </h1>
              {restaurant.location && (
                <p className="text-sm text-gray-500">{restaurant.location}</p>
              )}
            </div>
          </div>
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Summary */}
        <Card className="mb-6 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">
              Found{" "}
              <span className="font-semibold text-primary">
                {dishes.length}
              </span>{" "}
              dish{dishes.length !== 1 && "es"}. Tap a card to view more.
            </p>
          </CardContent>
        </Card>

        {/* Dish Grid */}
        <div className="grid grid-cols-2 gap-4">
          {dishes.map((dish, i) => {
            const imageUrl = dish?.images?.[0] || "/placeholder.jpg";
            return (
              <Card
                key={dish.id || i}
                onClick={() => handleDishClick(dish.id || i)}
                className="shadow-md p-0 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <CardContent className="p-0 mb-6">
                  {/* Image container */}
                  <div className="relative w-full h-32 overflow-hidden rounded-t-lg">
                    <img
                      src={imageUrl}
                      alt={dish.title || "Unnamed Dish"}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2">
                      {dish.title || "Unnamed Dish"}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {dish.description || "Uncategorized"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action */}
        <div className="mt-8 space-y-3">
          <Link href="/camera">
            <Button variant="outline" className="w-full">
              Scan Another Menu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
