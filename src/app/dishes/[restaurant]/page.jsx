"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import Image from "next/image";

const proxiedImageUrl = (url) =>
  `/api/image-proxy?url=${encodeURIComponent(url)}`;

function checkImage(url) {
  return new Promise((resolve) => {
    const img = new window.Image(); // explicitly use window.Image in case of scope issues
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

async function findFirstValidImage(images) {
  if (!images || images.length === 0) return null;

  for (let i = 0; i < images.length; i++) {
    const url = proxiedImageUrl(images[i]);
    const valid = await checkImage(url);
    if (valid) {
      return url;
    }
  }

  return null;
}

export default function DishResults() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState({
    name: "Untitled",
    location: null,
  });

  // Store the valid image URL for each dish by index
  const [validImages, setValidImages] = useState({});

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
        name: meta.name || "Untitled",
        location: meta.location || null,
      });
    }

    setLoading(false);
  }, []);

  // When dishes load, find valid images for each dish asynchronously
  useEffect(() => {
    async function checkImages() {
      if (dishes.length === 0) return;

      const cached = localStorage.getItem("validDishImages");
      if (cached) {
        setValidImages(JSON.parse(cached));
        return;
      }

      const results = {};

      for (let i = 0; i < dishes.length; i++) {
        const validImageUrl = await findFirstValidImage(dishes[i].images);
        results[i] = validImageUrl; // may be null
      }

      setValidImages(results);
      localStorage.setItem("validDishImages", JSON.stringify(results));
    }

    checkImages();
  }, [dishes]);

  const handleDishClick = (dishId) => {
    router.push(`/dish-detail/${dishId}`);
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
          {dishes.map((dish, i) => (
            <Card
              key={dish.id || i}
              onClick={() => handleDishClick(dish.id || i)}
              className="shadow-md p-0 hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <CardContent className="p-0 mb-6">
                {/* Image container with fixed height and hidden overflow */}
                <div className="relative w-full h-32 overflow-hidden rounded-t-lg">
                  <Image
                    src={validImages[i] || "/placeholder.jpg"}
                    alt={dish.title || "Unnamed Dish"}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    placeholder="blur"
                    blurDataURL="/placeholder.jpg"
                    sizes="(max-width: 768px) 100vw"
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
          ))}
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
