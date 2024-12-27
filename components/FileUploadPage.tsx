"use client";

import { useRouter } from "next/navigation";
import { FileUpload } from "./ui/file-upload";

export function FileUploadPage() {
  const router = useRouter();

  const handleFileUpload = async (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    // Convert file to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Store the file data in localStorage (or you could use other state management solutions)
      localStorage.setItem('uploadedImage', reader.result as string);
      router.push('/process');
    };
  };

  return (
    <div className="w-full max-w-3xl">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}