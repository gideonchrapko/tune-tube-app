"use client";

import { fetchSounds } from "@/config/queries";
import { useQuery } from "@tanstack/react-query";
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

  const filteredSounds = soundsFirebase?.filter((sound: any) => {
    const matchesSearchQuery =
      sound.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      sound.mood.some((m: any) =>
        m.toLowerCase().includes(searchQuery.toLowerCase().trim()),
      );
    const matchesMood = selectedMood
      ? sound.mood.includes(selectedMood.toLowerCase())
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
              className={`px-3 my-1 border rounded-md text-sm ${
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
