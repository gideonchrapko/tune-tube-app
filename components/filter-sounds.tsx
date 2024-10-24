import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export function FilterSounds({
  sound,
  index,
  playingIndex,
  setPlayingIndex,
}: {
  sound: any;
  index: number;
  playingIndex: number | null;
  setPlayingIndex: (index: number | null) => void;
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (playingIndex === index) {
      audioRef.current.pause();
      setPlayingIndex(null);
    } else {
      if (playingIndex !== null) {
        const playingAudio = document.querySelector(
          `audio[data-index="${playingIndex}"]`,
        ) as HTMLAudioElement;
        if (playingAudio) {
          playingAudio.pause();
        }
      }
      audioRef.current.play();
      setPlayingIndex(index);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime =
        (Number(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
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
            onClick={() => handlePlayPause()}
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
            onChange={(e) => handleSeek(e)}
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
        ref={audioRef}
        src={sound.songUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        data-index={index}
      />
    </div>
  );
}
