import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  currentImage?: string | null;
}

export function ImageUpload({ onImageSelect, currentImage }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeImage = () => {
    setPreview(null);
    onImageSelect(null);
  };

  return (
    <div className="w-full">
      {preview ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-2xl overflow-hidden border border-primary/30 bg-card/60"
        >
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <button
            onClick={removeImage}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-destructive/80 backdrop-blur-sm flex items-center justify-center text-destructive-foreground hover:bg-destructive transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent">
            <p className="text-sm text-muted-foreground">Image uploaded successfully</p>
          </div>
        </motion.div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "relative rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300",
            isDragActive
              ? "border-primary bg-primary/10 shadow-neon-primary"
              : "border-border hover:border-primary/50 hover:bg-card/60"
          )}
        >
          <input {...getInputProps()} />
          <motion.div
            animate={isDragActive ? { scale: 1.05 } : { scale: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div
              className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
                isDragActive
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {isDragActive ? (
                <ImageIcon className="w-8 h-8" />
              ) : (
                <Upload className="w-8 h-8" />
              )}
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">
                {isDragActive ? "Drop your image here" : "Drag & drop an image"}
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse (max 5MB)
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
