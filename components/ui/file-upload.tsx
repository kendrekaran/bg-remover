import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  
    if (onChange) {
      onChange(newFiles);
    }
  };
  

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full flex items-center justify-center px-4 sm:px-8 md:px-16" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-6 sm:p-8 md:p-10 group/file block rounded-3xl cursor-pointer w-full max-w-md lg:max-w-xl h-auto relative overflow-hidden bg-zinc-900 border"
      >
        <input
          placeholder="Upload"
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center z-50">
          <p className="relative z-20 font-sans font-bold text-neutral-300 text-base sm:text-lg md:text-xl">
            Upload file
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 text-sm sm:text-base md:text-lg mt-2 text-center">
            Drag or drop your files here or click to upload
          </p>
          <div className="relative w-full mt-8 md:mt-10 max-w-lg mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-neutral-900 flex flex-col items-start justify-start p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-sm"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-sm md:text-base text-neutral-300 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-xs md:text-sm bg-neutral-800 text-white shadow-input"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>
  
                  <div className="flex text-xs md:text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-neutral-800"
                    >
                      {file.type}
                    </motion.p>
  
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      Modified{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-neutral-900 flex items-center justify-center h-28 md:h-32 mt-4 w-full max-w-xs mx-auto rounded-md border",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center text-xs sm:text-sm"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-400 mt-1" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-300" />
                )}
              </motion.div>
            )}
  
            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-28 md:h-32 mt-4 w-full max-w-xs mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
  
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex  flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex  flex-shrink-0 rounded-[2px]`}
            />
          );
        })
      )}
    </div>
  );
}
