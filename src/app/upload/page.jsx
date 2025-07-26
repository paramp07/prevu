"use client";

import { useAuth } from "@/context/AuthContext";
import { verifyAuth } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FaArrowLeft as ArrowLeft,
  FaImage as ImageIcon,
  FaCamera as Camera,
  FaSmileBeam as Profile,
} from "react-icons/fa";

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [restaurantName, setRestaurantName] = useState("");
  const { token } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef(null);

  useEffect(() => {
    verifyAuth(token, router).finally(() => setLoading(false));
  }, [token, router]);

  if (loading) return <p className="text-center mt-10">Checking login...</p>;

  const checkMenuImages = async (menu) => {
    const brokenImages = [];

    for (const category of menu) {
      for (const item of category.items || []) {
        const name = item.name || "Unnamed Dish";
        const imageUrls = item.images || [];
        const validImages = [];

        await Promise.all(
          imageUrls.map((url) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.src = url;

              img.onload = () => {
                validImages.push(url);
                resolve();
              };

              img.onerror = () => {
                brokenImages.push({ name, url });
                resolve();
              };
            });
          })
        );

        item.images = validImages;
      }
    }

    if (brokenImages.length > 0) {
      console.group("🛑 Broken image report");
      brokenImages.forEach(({ name, url }) =>
        console.log(`❌ ${name}: ${url}`)
      );
      console.groupEnd();
    }
  };

  const removeImage = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const processImages = async () => {
    if (selectedFiles.length === 0) return;

    setIsProcessing(true);

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("file", file);
      });

      const response = await fetch("http://127.0.0.1:8000/parse_menu/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();
      const name = result.restaurant_name || "Untitled";
      const slug = name.toLowerCase().replace(/\s+/g, "-");

      await checkMenuImages(result.menu || []);

      localStorage.setItem(
        "restaurantMeta",
        JSON.stringify({
          name,
          location: result.location || null,
          image: result.image || null,
        })
      );

      localStorage.setItem("finalDishes", JSON.stringify(result.menu || []));
      setRestaurantName(name);
      router.push(`/dishes/${slug}`);
    } catch (error) {
      console.error("❌ Error uploading or processing images:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (files) => {
    if (!files) return;

    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    setSelectedFiles((prev) => [...prev, ...imageFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleCameraClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      fileInputRef.current?.click();
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("Camera access denied:", error);
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 max-w-md mx-auto">
      {/* Top Nav */}
      <div className="mb-26 flex justify-between">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
        </Link>
        <h1 className="text-4xl font-bold text-primary font-vollkorn">prevu</h1>
        <Link
          href="/profile"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <Profile className="w-5 h-5 mr-2" />
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-vollkorn font-bold text-gray-900 leading-tight">
          Upload a picture or multiple pictures of the menu
        </h1>
      </div>

      {/* Upload Area */}
      <div className="mb-8">
        <div
          className={`relative border-4 rounded-2xl p-8 text-center transition-colors ${
            isDragOver
              ? "border-primary bg-gray-100"
              : "border-primary/40 bg-gray-300/10"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-black/30" />
            </div>
            <p className="text-black/30 font-medium">Select file</p>
          </div>
        </div>

        {/* File Preview */}
        {selectedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Selected files ({selectedFiles.length}):
            </p>
            <div className="space-y-1">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg"
                >
                  <span className="line-clamp-1">{file.name}</span>
                  <button
                    onClick={() => removeImage(index)}
                    className="text-red-500 hover:text-red-700 font-bold  "
                    aria-label={`Remove ${file.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center w-full mb-8">
        <div className="flex-1 border-t border-[#C8C8C8]"></div>
        <span className="px-4 text-[#C8C8C8] font-bold text-sm">OR</span>
        <div className="flex-1 border-t border-[#C8C8C8]"></div>
      </div>

      {/* Camera Button */}
      <div className="mb-8">
        <Button
          onClick={handleCameraClick}
          className="w-full bg-[#D4F5E8] hover:bg-[#a8dfc9] text-primary py-5 rounded-2xl font-medium border-0"
          variant="outline"
        >
          <Camera className="w-5 h-5 mr-2" />
          Open Camera & Take Photo
        </Button>
      </div>

      {/* Process Button */}
      <div className="mt-auto mb-10">
        <Button
          onClick={processImages}
          disabled={selectedFiles.length === 0 || isProcessing}
          className="w-full bg-primary/80 hover:bg-primary text-white py-5 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Processing..." : "Process"}
        </Button>
      </div>
    </div>
  );
}
