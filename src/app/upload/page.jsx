"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FaArrowLeft as ArrowLeft,
  FaImage as ImageIcon,
  FaCamera as Camera,
} from "react-icons/fa";

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (files) => {
    if (files) {
      const fileArray = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );
      setSelectedFiles((prev) => [...prev, ...fileArray]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleCameraClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Here you would implement camera functionality
      // For now, we'll just trigger file input
      fileInputRef.current?.click();
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("Camera access denied:", error);
      // Fallback to file input
      fileInputRef.current?.click();
    }
  };

  const handleProcess = () => {
    if (selectedFiles.length > 0) {
      console.log("Processing files:", selectedFiles);
      // Handle file processing logic here
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto">
      {/* Back Button */}
      <div className="mb-26 flex justify-between">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
        </Link>
        <h1 className="text-4xl font-bold text-primary font-vollkorn">prevu</h1>
        <span className="text-transparent">gggg</span>
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
          className="relative border-4 rounded-2xl p-8 text-center transition-colors border-primary/40 bg-gray-300/10"
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

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Selected files ({selectedFiles.length}):
            </p>
            <div className="space-y-1">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg"
                >
                  {file.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* {Divider} */}
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
          onClick={handleProcess}
          disabled={selectedFiles.length === 0}
          className="w-full bg-primary/80 hover:bg-primary text-white py-5 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Process
        </Button>
      </div>
    </div>
  );
}
