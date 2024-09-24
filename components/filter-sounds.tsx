import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export function FilterSounds({ sound, index }: { sound: any; index: any }) {
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
