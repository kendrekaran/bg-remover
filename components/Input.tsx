
  "use client";
  
  import { useState, useRef } from "react";
  import { Alert, AlertDescription } from "@/components/ui/alert";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Download } from "lucide-react"; // Import the download icon
  
  export function BackgroundRemover() {
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [downloading, setDownloading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    interface ImageUrlResponse {
        img_url: string;
    }
      
    interface ApiResponse {
    status: boolean;
    result?: string;
    error?: string;
    }
  
    const getImageUrl = async (file: File): Promise<string> => {
      const formData = new FormData();
      formData.append('file', file);
  
      const options = {
        method: 'POST',
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
          'x-rapidapi-host': 'open-ai21.p.rapidapi.com'
        },
        body: formData
      };
  
      const response = await fetch('https://open-ai21.p.rapidapi.com/getimgurl', options);
      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }
      
      const data = await response.json() as ImageUrlResponse;
      return data.img_url;
    };
  
    const removeBackground = async (imageUrl: string): Promise<string> => {
      const options = {
        method: 'POST',
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
          'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ img_url: imageUrl }),
      };
  
      const response = await fetch('https://open-ai21.p.rapidapi.com/bgremover', options);
      if (!response.ok) {
        throw new Error(`Failed to remove background: ${response.statusText}`);
      }
  
      const data = await response.json() as ApiResponse;
      if (!data.status || !data.result) {
        throw new Error(data.error || 'Failed to process image');
      }
  
      return data.result;
    };
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
        setError(null);
      }
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!file) {
        setError("Please select a file");
        return;
      }
  
      setLoading(true);
      setError(null);
      setResult(null);
  
      try {
        // Step 1: Upload file and get URL
        const imageUrl = await getImageUrl(file);
        
        // Step 2: Remove background using the URL
        const processedImageUrl = await removeBackground(imageUrl);
        
        setResult(processedImageUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
  
    const handleReset = () => {
      setFile(null);
      setResult(null);
      setError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
  
    const handleDownload = async () => {
      if (!result) return;
  
      try {
        setDownloading(true);
        
        // Fetch the image
        const response = await fetch(result);
        const blob = await response.blob();
        
        // Create a download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // Generate filename: original filename + "-nobg" + original extension
        const originalName = file?.name || 'image';
        const extension = originalName.split('.').pop();
        const filename = `${originalName.split('.')[0]}-nobg.${extension}`;
        
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (err) {
        setError("Failed to download image");
      } finally {
        setDownloading(false);
      }
    };
  
    return (
      <div className="w-full max-w-3xl space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              required
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" disabled={loading || !file}>
              {loading ? "Processing..." : "Remove Background"}
            </Button>
            {(file || result) && (
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
            )}
          </div>
  
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>
  
        {file && !result && !loading && (
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={URL.createObjectURL(file)}
              alt="Selected image"
              className="w-full h-auto max-h-[600px] object-contain"
            />
          </div>
        )}
  
        {result && (
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={result}
                alt="Processed image"
                className="w-full h-auto max-h-[600px] object-contain"
              />
            </div>
            <Button 
              onClick={handleDownload} 
              disabled={downloading}
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              {downloading ? "Downloading..." : "Download Image"}
            </Button>
          </div>
        )}
      </div>
    );
  }