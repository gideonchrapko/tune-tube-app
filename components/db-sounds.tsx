"use client";

import { fetchSounds } from "@/config/queries";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

interface Sound {
  title: string;
  albumTitle: string;
  mood: string[];
  songUrl: string;
  artUrl: string;
}

const moods = [
  "Energetic",
  "Upbeat",
  "Sad",
  "Uplifting",
  "Happy",
  "Aggressive",
  "Mysterious",
  "Chill",
  "Dramatic",
  "Inspirational",
  "Dreamy",
  "Groovy",
  "Intense",
  "Peaceful",
  "Trendy",
];

const DbSoundsPage = () => {
  const {
    data: soundsFirebase,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sounds"],
    queryFn: fetchSounds,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const filteredSounds = soundsFirebase?.filter((soundsFirebase: any) => {
    const matchesSearchQuery =
      soundsFirebase.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim()) ||
      soundsFirebase.mood.some((m: any) =>
        m.toLowerCase().includes(searchQuery.toLowerCase().trim()),
      );
    const matchesMood = selectedMood
      ? soundsFirebase.mood.includes(selectedMood)
      : true;
    return matchesSearchQuery && matchesMood;
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <div className="w-full max-w-4xl p-6 mt-12">
        <h1 className="text-3xl font-bold mb-6">Sounds Library</h1>
        <input
          type="text"
          placeholder="Search sounds by title or mood..."
          className="mb-6 p-3 w-full border rounded-md"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="mb-6 flex flex-wrap space-x-2">
          {moods.map((mood) => (
            <button
              key={mood}
              className={`px-3 py-1 border rounded-md text-sm ${
                selectedMood === mood ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() =>
                setSelectedMood(mood === selectedMood ? null : mood)
              }
            >
              {mood}
            </button>
          ))}
        </div>
        {!isLoading && (
          <>
            {filteredSounds!.length > 0 ? (
              <>
                {filteredSounds?.map((sound: any, index: number) => (
                  <div key={index}>
                    <FilterSounds
                      key={index}
                      index={index}
                      sound={sound}
                      isLoading={isLoading}
                      error={error}
                    />
                  </div>
                ))}
              </>
            ) : (
              <p>No sounds found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DbSoundsPage;

function FilterSounds({
  sound,
  isLoading,
  error,
  index,
}: {
  sound: any;
  isLoading: boolean;
  error: any;
  index: any;
}) {
  if (isLoading) {
    <div>Loading...</div>;
  }

  if (error) {
    <div>There was an error loading data, please refresh page</div>;
  }

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const handlePlayPause = (index: number) => {
    const currentAudio = audioRefs.current[index];
    if (!currentAudio) return;

    if (playingIndex === index) {
      currentAudio.pause();
      setPlayingIndex(null);
    } else {
      if (playingIndex !== null && audioRefs.current[playingIndex]) {
        audioRefs.current[playingIndex]?.pause();
      }
      currentAudio.play();
      setPlayingIndex(index);
      setDuration(currentAudio.duration);
    }
  };

  const handleTimeUpdate = (index: number) => {
    const currentAudio = audioRefs.current[index];
    if (currentAudio) {
      setCurrentTime(currentAudio.currentTime);
      setDuration(currentAudio.duration);
    }
  };

  const handleSeek = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const currentAudio = audioRefs.current[index];
    if (currentAudio) {
      const seekTime = (Number(e.target.value) / 100) * currentAudio.duration;
      currentAudio.currentTime = seekTime;
    }
  };

  return (
    <div className="my-4 bg-white p-4 rounded-lg shadow-lg flex items-center justify-between w-full transition-transform transform hover:scale-105 hover:shadow-2xl">
      <Image
        src={sound.artUrl}
        alt={sound.title}
        className="w-16 h-16 object-cover rounded-md mr-4"
        width={100}
        height={100}
      />
      <div className="flex flex-col justify-between w-full">
        <div className="flex items-center space-x-4">
          <button
            className={`text-blue-500 hover:text-blue-700 ${
              playingIndex === index ? "fa fa-pause" : "fa fa-play"
            }`}
            onClick={() => handlePlayPause(index)}
          >
            {playingIndex === index ? <Pause /> : <Play />}
          </button>

          <input
            type="range"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            min="0"
            max="100"
            value={
              playingIndex === index && duration
                ? (currentTime / duration) * 100
                : 0
            }
            onChange={(e) => handleSeek(index, e)}
          />
        </div>

        <div className="flex justify-between items-center mt-2">
          <div>
            <h3 className="text-lg font-semibold">{sound.title}</h3>
            <p className="text-sm text-gray-500">{sound.mood.join(", ")}</p>
          </div>

          <div className="text-sm text-gray-500">
            {Math.floor(currentTime / 60)}:
            {Math.floor(currentTime % 60)
              .toString()
              .padStart(2, "0")}{" "}
            / {Math.floor(duration / 60)}:
            {Math.floor(duration % 60)
              .toString()
              .padStart(2, "0")}
          </div>
        </div>
      </div>

      <audio
        ref={(el) => {
          audioRefs.current[index] = el;
        }}
        src={sound.songUrl}
        onTimeUpdate={() => handleTimeUpdate(index)}
        onLoadedMetadata={() =>
          setDuration(audioRefs.current[index]?.duration || 0)
        }
      />
    </div>
  );
}
