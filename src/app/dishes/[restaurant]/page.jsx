"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bookmark, Star, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MenuItemDetailDialog } from "@/components/large/menu-item";


function capitalizeWords(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function RestaurantPage({ params }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canLoad, setCanLoad] = useState(null);
  const [restaurant, setRestaurant] = useState({
    name: "Untitled",
    location: null,
    image: null, // ✅ Add image field
  });

  useEffect(() => {
    const savedDishes = localStorage.getItem("finalDishes");
    const savedMeta = localStorage.getItem("restaurantMeta");
    console.log(savedDishes);

    if (savedDishes) {
      const parsedMenu = JSON.parse(savedDishes);
      setMenu(parsedMenu);
      // console.log("📦 Loaded menu JSON:", parsedMenu);
    }

    if (savedMeta) {
      const meta = JSON.parse(savedMeta);
      setRestaurant({
        name: capitalizeWords(meta.name) || "Untitled",
        location: meta.location || null,
        image: meta.image || null, // ✅ Load the image field
      });
      // console.log("🏷️ Restaurant meta:", meta);
    }

    setLoading(false);
  }, []);

//   const restaurant = {
//     name: "Rockstar Hibachi",
//     rating: 4.1,
//     reviewCount: "320+",
//     locations: 9,
//     hours: "4:00 am - 10:00 pm",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc augue massa, tristique nec mauris vel, vestibulum viverra neque. Sed mi velit, vulputate in mauris ut, hendrerit ut pretium tortor.",
//     heroImage:
//       "https://images.unsplash.com/photo-1428660386617-8d277e7deaf2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2Vyc3xlbnwwfHwwfHx8MA%3D%3D",
//   };

  const menuSections = [
    {
      title: "Main Course",
      items: [
        {
          id: "1",
          name: "Chicken Finger",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc augue massa, tristique nec mauris vel...",
          price: 19.0,
          image:
            "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ingredients: [
            "Pork",
            "Beef",
            "Salt",
            "Sugar",
            "Paprika",
            "Garlic powder",
            "Onion powder",
            "Black pepper",
            "Chili flakes or red pepper",
            "Sodium nitrite",
            "Starter cultures",
            "Natural casing",
          ],
          dietaryTags: ["Gluten-free", "Vegan", "Vegetarian"],
          additionalPhotos: [
            "/placeholder.svg?height=96&width=96",
            "/placeholder.svg?height=96&width=96",
          ],
        },
        {
          id: "2",
          name: "Spicy Noodles",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc augue massa, tristique nec mauris vel...",
          price: 9.0,
          image: "/placeholder.svg?height=80&width=80",
          ingredients: ["Noodles", "Chili", "Vegetables"],
          dietaryTags: ["Spicy"],
          additionalPhotos: [],
        },
      ],
    },
    {
      title: "Pizzas",
      items: [
        {
          id: "3",
          name: "Pepperoni Pizza",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc augue massa, tristique nec mauris vel...",
          price: 15.0,
          image: "/placeholder.svg?height=80&width=80",
          ingredients: ["Dough", "Tomato Sauce", "Pepperoni", "Cheese"],
          dietaryTags: ["Dairy"],
          additionalPhotos: [],
        },
      ],
    },
  ];

  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen no-scrollbar overflow-y-auto bg-white ">
      {/* Header */}
      <div className="z-0 ">
        {/* Back Button */}
        <div className="mb-36 absolute z-1 p-2 left-2 top-6 flex justify-between">
          <Link
            href="/upload"
            className="inline-flex items-center text-gray-900 hover:text-gray-900"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute bg-white backdrop-blur-sm rounded-full w-8 h-8"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="sticky h-72 w-full z-0">
          <div className="relative w-full h-full">
            <Image
              src={restaurant.heroImage || "/placeholder.svg"}
              alt={`${restaurant.name} restaurant`}
              fill
              className="object-cover contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="rounded-2xl bg-neutral-100 mt-[-.8rem]  relative z-1">
        <div className="px-6 py-6 flex flex-col gap-2">
          <div className="flex items-start justify-between ">
            <span className="text-transparent">hhhg</span>
            <h1 className="text-3xl  font-semibold font-vollkorn tracking-tight text-gray-900">
              {restaurant.name}
            </h1>
            <Button variant="ghost" size="sm" className="p-1">
              <Bookmark className="w-5 h-5 text-gray-900" />
            </Button>
          </div>

          {/* Rating and Info */}
          <div className="flex items-center gap-4  justify-center text-sm text-neutral-600">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-neutral-700">
                {restaurant.rating}
              </span>
              <span>({restaurant.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.locations} locations</span>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-center justify-center gap-1  text-sm text-neutral-600">
            <Clock className="w-4 h-4" />
            <span>Hours: {restaurant.hours}</span>
          </div>

          {/* Description */}
          <p className="text-neutral-800 text-center text-sm leading-relaxed mb-8">
            {restaurant.description}
          </p>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="w-full">
        <div className=" flex flex-col gap-2 mt-2">
          {menuSections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="bg-neutral-100 px-6 pb-8 pt-4 rounded-2xl"
            >
              <h2 className="text-2xl font-medium tracking-tighter text-gray-900 mb-4">
                {section.title}
              </h2>

              <div className="space-y-4">
                {section.items.map((item, index) => (
                  <div key={item.id} onClick={() => handleMenuItemClick(item)}>
                    {/* Menu Item */}
                    <div className="flex gap-4 cursor-pointer">
                      <div className="flex-3">
                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        <p className="text-sm font-light text-gray-900">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="w-32 flex-2 h-26 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Line divider */}
                    {index !== section.items.length - 1 && (
                      <span className="block h-[2px] w-full bg-gray-200 my-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Item Detail Dialog */}
      <MenuItemDetailDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        item={selectedMenuItem}
      />
    </div>
  );
}
