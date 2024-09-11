import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoEditor = () => {
  const [volume, setVolume] = useState(0.5); // Default volume (50%)
  const [playbackRate, setPlaybackRate] = useState(1); // Playback speed

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
      {/* Video Player */}
      <ReactPlayer
        url="path_to_uploaded_video.mp4" // This will be dynamically set
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
        <p className="text-center mt-2">Volume: {(volume * 100).toFixed(0)}%</p>
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
    </div>
  );
};

export default VideoEditor;
