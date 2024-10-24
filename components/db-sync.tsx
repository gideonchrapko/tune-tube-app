"use client";

import React, { useCallback, useState } from "react";
import ReactPlayer from "react-player";
import Uploader from "@/components/ui/uploader"; // Importing the Uploader component
import { Button } from "./ui/button";
import { useYoutubeUpload } from "@/hooks/useSettingsMutations";

const DbSyncPage = () => {
  const [video, setVideo] = useState<string | null>(null); // State for video URL
  const [volume, setVolume] = useState(0.5); // Default volume (50%)
  const [playbackRate, setPlaybackRate] = useState(1); // Playback speed
  const [audioStart, setAudioStart] = useState(0); // Audio start time
  const uploadData = "Upload data here";

  const { refetch: uploadVideo, data } = useYoutubeUpload(uploadData);

  const handleVideoUpload = (files: File[]) => {
    if (files && files[0]) {
      const uploadedVideo = URL.createObjectURL(files[0]);
      setVideo(uploadedVideo);
    }
  };

  const handleEndPoint = useCallback(async () => {
    await uploadVideo();
  }, [uploadVideo]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <div className="w-full max-w-4xl p-6 mt-12">
        <h1 className="text-5xl font-bold">Sync</h1>
        <Button onClick={handleEndPoint}>Hit API endpoint</Button>
        <div className="container mx-auto">
          {!video ? (
            // Show the uploader first if no video is uploaded
            <Uploader onVideoUpload={handleVideoUpload} />
          ) : (
            // Once the video is uploaded, show the video editor
            <div className="bg-slate-50 p-6 rounded-lg shadow-lg mt-10">
              {/* Video Player */}
              <ReactPlayer
                url={video} // Display uploaded video
                controls
                width="100%"
                height="500px"
                volume={volume}
                playbackRate={playbackRate}
              />

              {/* Volume Control */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Adjust Volume</h3>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-center mt-2">
                  Volume: {(volume * 100).toFixed(0)}%
                </p>
              </div>

              {/* Playback Speed Control */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Playback Speed</h3>
                <select
                  value={playbackRate}
                  onChange={(e) => setPlaybackRate(Number(e.target.value))}
                  className="block w-full bg-white border border-gray-300 rounded-lg p-2 focus:outline-none"
                >
                  <option value="0.5">0.5x</option>
                  <option value="1">Normal (1x)</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2x</option>
                </select>
              </div>

              {/* Audio Controls */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">
                  Add Sound from Library
                </h3>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={audioStart}
                  onChange={(e) => setAudioStart(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-center mt-2">
                  Sound starts at: {audioStart} seconds
                </p>
                <audio src="path_to_audio.mp3" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DbSyncPage;
