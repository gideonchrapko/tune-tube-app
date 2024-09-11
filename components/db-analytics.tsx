"use client";

import { useAuth } from "@/app/auth/AuthContext";
import Image from "next/image";

export default function AnalyticsPage() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100 pt-24">
      <div className="flex flex-col w-full transition-all duration-300">
        <div className="flex items-center h-[105px] px-8 py-6">
          <div>
            <p className="font-bold text-black text-3xl">Welcome,</p>
            <p className="text-black text-3xl">{user?.displayName}</p>
          </div>
        </div>

        <div className="flex justify-between items-center h-[400px] px-8 py-6 bg-[#f0f4f7]">
          <div className="w-1/2 h-64 rounded-xl mx-4 bg-[#f0f4f7] shadow-lg relative flex items-center p-8">
            <div className="w-1/3 pr-6">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/LD%20Soundscapes%20Artwork.png?alt=media&token=ce4fc862-68fa-437c-a6e3-7eb8897d8fb3"
                alt="Cover Art"
                width={150}
                height={150}
                className="rounded-lg"
              />
            </div>

            <div className="w-2/3 flex flex-col space-y-12">
              <div>
                <p className="font-bold text-black text-lg">Trending Now</p>
                <p className="text-black text-base">
                  LD Soundscapes - Space Age
                </p>
              </div>

              <a
                href="https://www.youtube.com/source/M6jyrMM8Iec/shorts?bp=8gUeChwSGgoLTTZqeXJNTThJZWMSC002anlyTU04SWVj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mt-4"
              >
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/YouTube%20Shorts.png?alt=media&token=8fd2f3be-b55a-4f0a-ad24-6e766ece3458"
                  alt="YouTube Shorts"
                  width={30}
                  height={30}
                />
                <p className="ml-2 font-bold text-black text-lg">PLAY</p>
              </a>
            </div>

            <div className="absolute top-0 right-0 -mt-4 -mr-4">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/Trending%20Sound.png?alt=media&token=e9bcf3b2-e6a4-465d-92b0-9221d82d9a9e"
                alt="Trending Sound"
                width={60}
                height={60}
              />
            </div>
          </div>

          <div className="w-1/2 h-64 rounded-xl mx-4 bg-[#f0f4f7] shadow-lg relative flex items-center p-8">
            <div className="w-1/3 pr-6">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/Sounds%20of%20Travel%20Artwork.png?alt=media&token=467d70b0-f873-4641-a6be-c7dc8118d217"
                alt="Cover Art"
                width={150}
                height={150}
                className="rounded-lg"
              />
            </div>

            <div className="w-2/3 flex flex-col space-y-12">
              <div>
                <p className="font-bold text-black text-lg">Recent Release</p>
                <p className="text-black text-base">Sounds of Travel</p>
              </div>

              <a
                href="https://www.youtube.com/watch?v=iE9u7EjlgI8&list=PLR52GNCsgit_qaWjCNaUUi20AcooReAKX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mt-4"
              >
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/YouTube%20Shorts.png?alt=media&token=8fd2f3be-b55a-4f0a-ad24-6e766ece3458"
                  alt="YouTube Shorts"
                  width={30}
                  height={30}
                />
                <p className="ml-2 font-bold text-black text-lg">PLAY</p>
              </a>
            </div>

            <div className="absolute top-0 right-0 -mt-4 -mr-4">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/New%20Sound.png?alt=media&token=d2a1ec99-2804-4ebb-9275-5fc3e935e5cb"
                alt="New Sound"
                width={60}
                height={60}
              />
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="bg-[#f0f4f7] h-[500px] mt-8 px-8 py-6">
          {/* Section Title */}
          <h2 className="text-2xl font-bold text-black">July 2024 Insights</h2>

          {/* Insights Container and Stats Section */}
          <div className="flex justify-between items-start w-full px-8">
            {/* Insights Container */}
            <div className="flex items-center w-3/5 h-80 rounded-xl mt-6 bg-[#f0f4f7] shadow-lg p-12 relative">
              {/* Cover Art */}
              <div className="w-2/5 pr-5">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/Sounds%20of%20Travel%20Artwork.png?alt=media&token=467d70b0-f873-4641-a6be-c7dc8118d217"
                  alt="Cover Art"
                  width={180}
                  height={180}
                  className="rounded-lg"
                />
              </div>

              {/* Text Content */}
              <div className="w-2/3 flex flex-col">
                <p className="font-bold text-black text-2xl">My Favorite Song</p>
                <div className="mt-7">
                  <p className="text-black text-lg">
                    <span className="font-semibold">Title:</span> <span>Far from Home</span>
                  </p>
                  <p className="text-black text-lg">
                    <span className="font-semibold">Album:</span> <span>Sounds of Travel</span>
                  </p>
                  <p className="text-black text-lg">
                    <span className="font-semibold">Views:</span> <span>86,357,540</span>
                  </p>
                </div>
              </div>

              {/* Favorite Song Image (Top Right, Hanging off and set to 60x60px) */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/Favorite%20Song.png?alt=media&token=85126710-d69a-4894-b116-48619341e3bb"
                  alt="Favorite Song"
                  width={60}
                  height={60}
                />
              </div>
            </div>

            {/* Spacer using flex-grow */}
            <div className="flex-grow"></div>

            {/* Stats Section */}
            <div className="flex flex-col justify-start w-2/5 h-80 mt-6 ml-20">

              {/* Stats Data */}
              <div className="mt-4 space-y-6" style={{ fontFamily: 'Avenir' }}>
                <p className="text-black text-xl">
                  <span className="font-semibold">Monthly Views: </span>
                  <span>90,106,396</span>
                </p>
                <p className="text-black text-xl">
                  <span className="font-semibold">LifeTime Views: </span>
                  <span>93,439,996</span>
                </p>
                <p className="text-black text-xl">
                  <span className="font-semibold">RPM: </span>
                  <span>$0.08</span>
                </p>
                <p className="text-black text-xl">
                  <span className="font-semibold">TunePool Earnings: </span>
                  <span>$2,361.03</span>
                </p>
                <p className="text-black text-xl">
                  <span className="font-semibold">Reclaimed AdSense: </span>
                  <span>$4,505.32</span>
                </p>
                <p className="text-black text-xl">
                  <span className="font-semibold">Total Monthly Earnings: </span>
                  <span>$6,866.35</span>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
