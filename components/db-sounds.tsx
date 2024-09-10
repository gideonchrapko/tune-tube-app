"use client";

import { useState, useRef } from "react";

interface Sound {
  title: string;
  albumTitle: string;
  mood: string[];
  songUrl: string;
  artUrl: string;
}

const mockSounds: Sound[] = [
  {
    title: "Dizzy",
    albumTitle: "DIY",
    mood: ["Energetic", "Happy"],
    songUrl:
      "https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/Songs%2FBring%20the%20Energy%20-%20Racecar.wav?alt=media&token=ad9f4984-93ff-4f9f-99d0-abbd963304fb",
    artUrl:
      "https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/Images%2FAlbum%20Artwork%2FDIY%20-%20Dashboard.png?alt=media&token=df5b21a5-068c-4da6-a3d8-b2f693e61cc4",
  },
  {
    title: "Swag",
    albumTitle: "Bring the Energy",
    mood: ["Chill", "Relaxed"],
    songUrl:
      "https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/Songs%2FDIY%20-%20Dizzy.wav?alt=media&token=c65addcf-861e-4bc8-bfe5-b6ac373e6ea6",
    artUrl:
      "https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/Images%2FAlbum%20Artwork%2FEnergy%20-%20Dashboard.png?alt=media&token=a842adc0-b129-470b-a0ef-224a64881bcf",
  },
];

const moods = ["Energetic", "Happy", "Chill", "Relaxed", "Sad"];

const DbSoundsPage = () => {
  const [sounds] = useState<Sound[]>(mockSounds);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
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

  const handleSeek = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const currentAudio = audioRefs.current[index];
    if (currentAudio) {
      const seekTime = (Number(e.target.value) / 100) * currentAudio.duration;
      currentAudio.currentTime = seekTime;
    }
  };

  const filteredSounds = sounds.filter((sound) => {
    const matchesSearchQuery =
      sound.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      sound.mood.some((m) =>
        m.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    const matchesMood = selectedMood ? sound.mood.includes(selectedMood) : true;
    return matchesSearchQuery && matchesMood;
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <div className="w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold mb-6">Sounds Library</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search sounds by title or mood..."
          className="mb-6 p-3 w-full border rounded-md"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Mood Filter Buttons */}
        <div className="mb-6 flex flex-wrap space-x-2">
          {moods.map((mood) => (
            <button
              key={mood}
              className={`px-3 py-1 border rounded-md text-sm ${selectedMood === mood
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
                }`}
              onClick={() => setSelectedMood(mood === selectedMood ? null : mood)}
            >
              {mood}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredSounds.length > 0 ? (
            filteredSounds.map((sound, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between w-full transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                {/* Album Art */}
                <img
                  src={sound.artUrl}
                  alt={sound.title}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />

                {/* Play Button + Progress Bar */}
                <div className="flex flex-col justify-between w-full">
                  <div className="flex items-center space-x-4">
                    <button
                      className={`text-blue-500 hover:text-blue-700 ${playingIndex === index ? "fa fa-pause" : "fa fa-play"
                        }`}
                      onClick={() => handlePlayPause(index)}
                    >
                      {playingIndex === index ? "Pause" : "Play"}
                    </button>

                    {/* Progress Bar */}
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

                  {/* Song Info */}
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <h3 className="text-lg font-semibold">{sound.title}</h3>
                      {/* Display Moods */}
                      <p className="text-sm text-gray-500">
                        {sound.mood.join(", ")}
                      </p>
                    </div>

                    {/* Time Display */}
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

                {/* Audio Element */}
                <audio
                  ref={(el) => {
                    audioRefs.current[index] = el; // Just assign, no need to return anything
                  }}
                  src={sound.songUrl}
                  onTimeUpdate={() => handleTimeUpdate(index)}
                  onLoadedMetadata={() => setDuration(audioRefs.current[index]?.duration || 0)}
                />
              </div>
            ))
          ) : (
            <p>No sounds found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DbSoundsPage;
