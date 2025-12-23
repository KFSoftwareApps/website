"use client";

import { useState, useRef } from "react";
import { Upload, X, Check, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  disabled?: boolean;
}

export default function ImageUpload({ value, onChange, onRemove, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("blog-images").getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Resim yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    // Optional: Delete from storage
    onRemove(value);
  };

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      {value ? (
        <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-200 group">
          <div className="absolute top-2 right-2 z-10">
            <button
              type="button"
              onClick={handleRemove}
              className="bg-red-500 text-white p-1 rounded-full shadow-sm hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <Image fill className="object-cover" alt="Kapak Görseli" src={value} />
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-64 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <input
            type="file"
            accept="image/*"
            disabled={isUploading || disabled}
            ref={fileInputRef}
            onChange={onUpload}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-2 text-gray-500">
            {isUploading ? (
              <>
                <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                <span className="font-medium text-blue-500">Yükleniyor...</span>
              </>
            ) : (
              <>
                <Upload className="h-10 w-10 text-gray-400" />
                <span className="font-medium">Resim yüklemek için tıklayın</span>
                <span className="text-xs text-gray-400">veya sürükleyip bırakın</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
