import { cn } from "@/lib/utils";
import AnimatedGridPattern from "./ui/animated-grid-pattern";
import { FileUploadPage } from "./FileUploadPage";
import SparklesText from "./ui/sparkles-text";
import Navbar from "./Navbar";

export function Hero() {
  return (
    <div className="relative flex flex-col h-screen w-full items-center justify-center gap-8 overflow-hidden rounded-lg bg-black">
      <Navbar/>
      <div className="pt-32 flex flex-col items-center text-center justify-center gap-4">
        <SparklesText text="Image Clipper" />
        <p className="text-sm text-center text-gray-200">
        Upload your image, remove the background instantly,<br /> and focus on what matters most creativity.</p>
      </div>
      <FileUploadPage/>


      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
    </div>
  );
}
