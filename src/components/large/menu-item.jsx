"use client";

import Image from "next/image";
import { X, Upload, Camera } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function MenuItemDetailDialog({ isOpen, onClose, item }) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="border-none ">
      <DialogContent
        className="p-0 max-w-md w-full h-[90%] top-150 sm:rounded-xl overflow-hidden flex flex-col"
        showCloseButton={false}
      >
        {/* Image Section */}
        <div className="relative w-full h-64 sm:h-72">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full w-8 h-8"
          >
            <X className="w-5 h-5" />
          </Button>
          <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {item.additionalPhotos.length + 1}+ Photos
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 px-5 py-3  overflow-y-auto ">
          <div className="flex flex-col gap-3 mt-2">
            {/* Title and Share */}
            <div className="flex items-center justify-between">
              <h2 className="text-[2.4rem] leading-1 font-medium  font-vollkorn tracking-tighter text-gray-900">
                {item.name}
              </h2>
              <Button variant="ghost" size="icon" className="w-8">
                <Upload className="w-8 h-8 text-gray-500" />
              </Button>
            </div>
            {/* Description and Price */}
            <p className="text-gray-600 leading-relaxed ">{item.description}</p>
            <p className="  text-neutral-900/60 ">${item.price.toFixed(2)}</p>
          </div>
          <span className="block h-[2px] w-full bg-gray-200 my-4" />
          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Ingredients
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-700">
              {item.ingredients.map((ingredient, index) => (
                <span key={index} className="flex items-center">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
          <span className="block h-[2px] w-full bg-gray-200 my-4" />
          {/* Dietary Tags */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Dietary Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.dietaryTags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-teal-100 text-teal-700 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <span className="block h-[2px] w-full bg-gray-200 my-4" />
          {/* Photos Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Photos</h3>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {item.additionalPhotos.map((photo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden"
                >
                  <Image
                    src={photo || "/placeholder.svg"}
                    alt={`Additional photo ${index + 1}`}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {/* Add a placeholder for "add photo" if needed */}
              <div className="flex-shrink-0 w-24 h-24 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                <Camera className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
