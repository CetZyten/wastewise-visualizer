
import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageUpload: (image: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleImageUpload = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast.error('Please upload an image file (jpeg, png, etc)');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    
    // Create a preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Simulate upload delay
    setTimeout(() => {
      onImageUpload(file);
      setIsUploading(false);
    }, 1000);
  };

  const clearImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {!preview ? (
        <div 
          className={`upload-area bg-background hover:bg-muted/50 ${isDragging ? 'dragging' : ''} animate-scale-up`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Upload an image of waste</h3>
              <p className="text-sm text-muted-foreground mt-1">Drag and drop or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">Supports JPG, PNG, WEBP (max 5MB)</p>
            </div>
            <Button className="mt-4 bg-primary hover:bg-primary/90 text-white">
              Select Image
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden animate-scale-up">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white text-black border-white hover:bg-white/80"
              onClick={clearImage}
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
            
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90 text-white"
              disabled={isUploading}
            >
              {isUploading ? 'Processing...' : 'Classify Waste'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
