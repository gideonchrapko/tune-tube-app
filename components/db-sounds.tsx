"use client";

import { useState } from "react";
import { FilterSounds } from "./filter-sounds";

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

const DbSoundsPage = ({ soundsFirebase }: { soundsFirebase: any }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const toggleMood = (mood: string) => {
    setSelectedMoods((prevMoods) =>
      prevMoods.includes(mood)
        ? prevMoods.filter((m) => m !== mood)
        : [...prevMoods, mood],
    );
  };

  const filteredSounds = soundsFirebase?.filter((sound: any) => {
    const matchesSearchQuery =
      sound.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      sound.mood.some((m: any) =>
        m.toLowerCase().includes(searchQuery.toLowerCase().trim()),
      );
    const matchesMood =
      selectedMoods.length > 0
        ? selectedMoods.every((mood) => sound.mood.includes(mood.toLowerCase()))
        : true;

    return matchesSearchQuery && matchesMood;
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <div className="w-full max-w-4xl p-6 mt-12">
        <h1 className="text-5xl font-bold mb-6">Sounds Library</h1>
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
              className={`px-3 my-1 border rounded-md text-sm ${
                selectedMoods.includes(mood)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => toggleMood(mood)}
            >
              {mood}
            </button>
          ))}
        </div>
        {filteredSounds!.length > 0 ? (
          <>
            {filteredSounds?.map((sound: any, index: number) => (
              <div key={index}>
                <FilterSounds
                  key={index}
                  index={index}
                  sound={sound}
                  playingIndex={playingIndex}
                  setPlayingIndex={setPlayingIndex}
                />
              </div>
            ))}
          </>
        ) : (
          <p>No sounds found.</p>
        )}
      </div>
    </div>
  );
};

export default DbSoundsPage;
