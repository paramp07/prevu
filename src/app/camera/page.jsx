"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera as CameraIcon, Upload, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// Removed: import { useToast } from "@/hooks/use-toast";

export default function Camera() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const [restaurantName, setRestaurantName] = useState("Untitled"); // ✅ Step 1

  const fileInputRef = useRef(null);
  const singleFileInputRef = useRef(null);
  const router = useRouter();
  // Removed: const { toast } = useToast();

  const handleMultipleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImages((prev) => [...prev, e.target.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSingleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImages((prev) => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const processImages = async () => {
    if (selectedImages.length === 0) return;

    setIsProcessing(true);

    try {
      const formData = new FormData();

      // Convert all base64 images to blobs first
      for (let i = 0; i < selectedImages.length; i++) {
        const res = await fetch(selectedImages[i]);
        const blob = await res.blob();
        formData.append("file", blob, `image_${i}.png`);
      }

      // Send form data to backend
      const response = await fetch("http://127.0.0.1:8000/process_menu/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Processing result:", result);

      const name = result.restaurant_name || "Untitled";
      const slug = name.toLowerCase().replace(/\s+/g, "-"); // slugify

      setRestaurantName(name);

      // ✅ Step 3: Save to localStorage
      localStorage.setItem("finalDishes", JSON.stringify(result.menu_items));
      localStorage.setItem(
        "restaurantMeta",
        JSON.stringify({ name, location: result.location })
      );

      setIsProcessing(false);

      // ✅ Step 4: Navigate to dynamic restaurant dishes page
      router.push(`/dishes/${slug}`);
    } catch (error) {
      console.error("Error uploading images:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d8d8d8] to-[#ffe9ed] text-foreground p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold  ml-4">Scan Menu</h1>
        </div>

        {/* Camera/Upload Card */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Capture Menu Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedImages.length > 0 ? (
              <div className="space-y-4">
                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Menu ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border-2 border-border"
                      />
                      <Button
                        onClick={() => removeImage(index)}
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button
                    onClick={() => singleFileInputRef.current?.click()}
                    variant="outline"
                    className="flex-1"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Add More
                  </Button>
                  <Button
                    onClick={processImages}
                    disabled={isProcessing}
                    className="flex-1 bg-primary/90 hover:bg-primary"
                  >
                    {isProcessing
                      ? "Processing..."
                      : `Process ${selectedImages.length} Image${
                          selectedImages.length > 1 ? "s" : ""
                        }`}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-accent/30 h-64 rounded-lg flex items-center justify-center border-2 border-dashed border-ring">
                  <div className="text-center">
                    <CameraIcon className="h-12 w-12 text-foreground/40 mx-auto mb-4" />
                    <p className="text-foreground/60 font-light">
                      Take photos or upload images
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-primary/90 hover:bg-primary"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Multiple
                  </Button>
                  <Button
                    onClick={() => singleFileInputRef.current?.click()}
                    variant="outline"
                  >
                    <CameraIcon className="mr-2 h-4 w-4" />
                    Add One
                  </Button>
                </div>
              </div>
            )}

            {/* Hidden file inputs */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultipleImageUpload}
              className="hidden"
            />
            <input
              ref={singleFileInputRef}
              type="file"
              accept="image/*"
              onChange={handleSingleImageUpload}
              className="hidden"
            />
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-800 mb-2">
              Tips for best results:
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Ensure good lighting</li>
              <li>• Keep the menu flat and straight</li>
              <li>• Include the entire menu section</li>
              <li>• Avoid shadows and glare</li>
              <li>• Add multiple images for complete menus</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
