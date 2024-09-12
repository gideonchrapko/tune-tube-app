import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface UploaderProps {
  onVideoUpload: (files: File[]) => void;
}

const Uploader: React.FC<UploaderProps> = ({ onVideoUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onVideoUpload(acceptedFiles);
    },
    [onVideoUpload],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mkv", ".avi"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center w-full h-[550px] border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 p-4 text-center mt-10 cursor-pointer"
    >
      <input {...getInputProps()} />
      <svg
        className="w-12 h-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v4h16v-4M4 12V8a4 4 0 014-4h8a4 4 0 014 4v4M12 12v8"
        />
      </svg>
      <p className="text-gray-600">Drag and drop video files to upload</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
        Select files
      </button>
    </div>
  );
};

export default Uploader;
