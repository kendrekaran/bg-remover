"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ApiResponse {
  status: boolean;
  result?: string;
  error?: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function ProcessingPage() {
  const router = useRouter();
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const processImage = async () => {
      const imageData = localStorage.getItem('uploadedImage');
      
      if (!imageData) {
        router.push('/');
        return;
      }

      try {
        // Initial 5-second delay with loading screen
        await delay(5000);
        setShowContent(true);

        const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
        const API_URL = 'https://open-ai21.p.rapidapi.com/bgremover';

        const options = {
          method: 'POST',
          headers: {
            'x-rapidapi-key': API_KEY || '',
            'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ img_url: imageData }),
        };

        const response = await fetch(API_URL, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        
        if (data.status && data.result) {
          setResult(data.result);
        } else {
          throw new Error(data.error || "Failed to process image");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
        localStorage.removeItem('uploadedImage'); // Clean up
      }
    };

    processImage();
  }, [router]);

  const handleNewImage = () => {
    router.push('/');
  };

  // Show loading screen for first 5 seconds
  if (!showContent) {
    return (
      <div className="flex flex-col justify-center items-center gap-6 h-screen bg-black">
        <div className="text-white text-lg font-semibold">
          Removing Image Background ...
        </div>
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-3xl space-y-6">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={handleNewImage}>Upload New Image</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl space-y-6">
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-700 mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Processing your image...
          </p>
        </div>
      ) : (
        result && (
          <div className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-neutral-900 p-4">
            <img
              src={result}
              alt="Processed image"
              className="w-full h-auto max-h-[600px] object-contain"
            />
            <div className="mt-4 flex justify-between">
              <Button 
                onClick={handleNewImage}
                variant="outline"
              >
                Upload New Image
              </Button>
              <Button 
                onClick={() => window.open(result, '_blank')}
                variant="default"
              >
                Download Image
              </Button>
            </div>
          </div>
        )
      )}
    </div>
  );
}