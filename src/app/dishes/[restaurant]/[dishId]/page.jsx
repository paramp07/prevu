"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DishDetail() {
  const { restaurant, dishId } = useParams();
  const router = useRouter();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("finalDishes");
    if (stored) {
      const parsed = JSON.parse(stored);
      const found = parsed.find((d, i) => d.id === dishId || i.toString() === dishId);
      if (found) setDish(found);
    }
  }, [dishId]);

  if (!dish) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Loading dish details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-md mx-auto p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Cover Image */}
        <div className="w-full h-56 rounded-lg overflow-hidden mb-4">
          <img
            src={dish.images?.[0] || "/placeholder.jpg"}
            alt={dish.title || "Dish"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dish Info */}
        <h1 className="text-2xl font-bold mb-2">{dish.title || "Unnamed Dish"}</h1>
        {dish.description && (
          <p className="text-sm text-gray-700 mb-4">{dish.description}</p>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p className="text-gray-500">Price</p>
            <p className="font-semibold">{dish.price || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500">Calories</p>
            <p className="font-semibold">{dish.calories || "N/A"}</p>
          </div>
        </div>

        {dish.ingredients && dish.ingredients.length > 0 && (
          <div className="mb-6">
            <h2 className="text-md font-semibold mb-1">Ingredients</h2>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {dish.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Gallery */}
        {dish.images?.length > 1 && (
          <div className="mb-4">
            <h2 className="text-md font-semibold mb-2">Gallery</h2>
            <div className="grid grid-cols-3 gap-2">
              {dish.images.slice(1).map((img, i) => (
                <div key={i} className="w-full h-24 rounded-md overflow-hidden">
                  <img
                    src={img}
                    alt={`Dish image ${i + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
