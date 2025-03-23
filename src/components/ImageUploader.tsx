
import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload and classify images",
        variant: "destructive"
      });
      return;
    }

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, etc.)');
      return false;
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5MB limit');
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleFileSelected = (file: File) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload and classify images",
        variant: "destructive"
      });
      return;
    }

    if (validateFile(file)) {
      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Call the callback with the file
      onImageSelected(file);
      
      toast({
        title: "Image uploaded successfully",
        description: "Analyzing your waste...",
        variant: "default",
        className: "toast-success"
      });
      
      // Clean up
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const triggerFileInput = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload and classify images",
        variant: "destructive"
      });
      return;
    }
    
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 animate-fade-in">
      {!previewUrl ? (
        <div
          className={`upload-area ${isDragging ? 'dragging' : ''} border-foreground/20 dark:border-foreground/10`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileSelected(e.target.files[0])}
            accept="image/*"
            className="hidden"
          />
          
          <div className="flex flex-col items-center justify-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Upload an image of your waste</h3>
            <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
              Drag and drop your image here, or click the button below to select a file
            </p>
            <Button onClick={triggerFileInput} disabled={!user}>
              <ImageIcon className="mr-2 h-4 w-4" />
              {isMobile ? "Take Photo" : "Select Image"}
            </Button>
            {!user && (
              <p className="text-sm text-muted-foreground mt-4">
                Please sign in to upload and classify images
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-auto object-contain max-h-[60vh]" 
            />
          </div>
          <Button 
            variant="destructive" 
            size="icon"
            className="absolute top-2 right-2 rounded-full shadow-lg"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ImageUploader;
