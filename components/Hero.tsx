import { cn } from "@/lib/utils";
import AnimatedGridPattern from "./ui/animated-grid-pattern";
import { FileUploadPage } from "./FileUploadPage";
import SparklesText from "./ui/sparkles-text";
import AnimatedShinyText from "./ui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";

export function Hero() {
  return (
    <div className="relative flex flex-col h-screen w-full items-center justify-center gap-8 overflow-hidden rounded-lg bg-black">
      
        <div
            className={cn(
            "group rounded-full border  text-base text-white transition-all ease-in hover:cursor-pointer  border-white/5 bg-neutral-900 hover:bg-neutral-800 mt-24",
            )}
        >
            <AnimatedShinyText className="inline-flex items-center   justify-center px-4 py-1 transition ease-out  hover:duration-300 hover:text-neutral-400">
            <span>✨ Introducing Magic UI</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
        </div>
        
        

        <div className=" flex flex-col items-center text-center justify-center gap-4">
            <SparklesText text="Image Clipper" />
            <p className="text-sm sm:text-xl text-center font-semibold text-gray-200">
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
