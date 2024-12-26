"use client"
import React, { useState } from "react";

const FileInputExample = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file) {
      console.log("File selected:", file.name);
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <div className="file-input-example">
      <input
        placeholder="Add File"
        type="file"
        onChange={handleFileChange}
        className="bg-gray-200 p-2 rounded-md"
      />
      <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-500 text-white rounded-md">
        Submit
      </button>

      {file && (
        <div className="mt-4">
          <p>Selected file: {file.name}</p>
        </div>
      )}
    </div>
  );
};

export default FileInputExample;
