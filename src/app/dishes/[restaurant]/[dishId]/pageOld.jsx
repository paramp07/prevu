"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function DishDetail() {
  const { restaurant, dishId } = useParams();
  const router = useRouter();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    async function enrichDish() {
      const stored = localStorage.getItem("finalDishes");
      if (!stored) return;

      let menu;
      try {
        menu = JSON.parse(stored); // array of categories
      } catch {
        return;
      }

      const allItems = menu.flatMap((cat) => cat.items || []);
      const dish = allItems.find((d) => d.slug === dishId);
      if (!dish) return;

      setDish(dish);

      // If dish already has images, skip enriching
      if (dish.images && dish.images.length > 0) {
        return;
      }

      try {
        const params = new URLSearchParams({
          slug: dishId,
          images_per_item: "3",
        });
        const res = await fetch(
          `http://127.0.0.1:8000/enrich_menu/?${params}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ menu }),
          }
        );
        if (!res.ok) return;
        const enrichedData = await res.json();
        if (enrichedData.error) return;

        localStorage.setItem(
          "finalDishes",
          JSON.stringify(enrichedData.menu || [])
        );

        const enrichedDish = (enrichedData.menu || [])
          .flatMap((cat) => cat.items || [])
          .find((d) => d.slug === dishId);
        if (enrichedDish) setDish(enrichedDish);
      } catch (error) {
        console.error(error);
      }
    }

    enrichDish();
  }, [dishId]);

  if (!dish) {
    return <p>Loading dish details...</p>;
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
        <div className="w-full h-56 rounded-lg overflow-hidden mb-4 relative">
          <Image
            src={dish?.images?.[0] || "/placeholder.jpg"}
            alt={dish?.name || "Dish image"}
            fill
            className="object-cover"
            priority // ensures the main image loads eagerly
            sizes="100vw"
          />
        </div>

        {/* Dish Info */}
        <h1 className="text-2xl font-bold mb-2">
          {dish.name || "Unnamed Dish"}
        </h1>
        {dish.description && (
          <p className="text-sm text-gray-700 mb-4">{dish.description}</p>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p className="text-gray-500">Price</p>
            <p className="font-semibold">
              {dish.price ? `$${dish.price}` : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Calories</p>
            <p className="font-semibold">{dish.calories || "N/A"}</p>
          </div>
        </div>

        {dish.ingredients?.length > 0 && (
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
                <div
                  key={i}
                  className="w-full h-24 relative rounded-md overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`${dish.name} image ${i + 2}`}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="33vw"
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
