"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "./ui/animated-grid-patterncopy";
import { Download, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ApiResponse {
  status: boolean;
  result?: string;
  error?: string;
}

export function ProcessingPage() {
  const router = useRouter();
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processImage = async () => {
      const imageData = localStorage.getItem('uploadedImage');
      
      if (!imageData) {
        router.push('/');
        return;
      }

      try {
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
      }
    };

    processImage();
  }, [router]);

  const handleNewImage = () => {
    router.push('/');
  };

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 space-y-4">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button 
              onClick={handleNewImage}
              className="w-full rounded-full"
              variant="default"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl mx-4">
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
            </div>
            <p className="text-white/80 text-lg font-medium">
              Processing your image...
            </p>
          </motion.div>
        ) : (
          result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl backdrop-blur-xl p-24 space-y-8 ">
              <div className="relative group">
                <div className="absolute inset-0  rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-center">
                  <div className="w-full flex items-center justify-center max-w-2xl aspect-square rounded-xl overflow-hidden  backdrop-blur-lg border border-white/50 ">
                    <img
                      src={result}
                      alt="Processed image"
                      className="w-96 h-96 object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  onClick={handleNewImage}
                  className="flex-1 rounded-full bg-white hover:bg-white/20 text-black border-0"
                  variant="outline"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Image
                </Button>
                <Button 
                  onClick={() => window.open(result, '_blank')}
                  className="flex-1 rounded-full bg-white hover:bg-white/20 text-black border-0 hover:text-white"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Result
                </Button>
              </div>
            </motion.div>
          )
        )}

        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
            "fixed inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 pointer-events-none "
          )}
        />
      </div>
    </div>
  );
}