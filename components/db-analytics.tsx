"use client";

import { useAuth } from "@/app/auth/AuthContext";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export default function AnalyticsPage({
  analyticsData,
}: {
  analyticsData: any;
}) {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <div className="w-full max-w-4xl p-6 mt-12">
        <h1 className="text-5xl font-bold">Creator Analytics</h1>
        <div className="flex flex-col items-center min-h-screen bg-gray-100 py-5">
          <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center h-[105px] px-2 py-1">
              <div>
                <p className="font-bold text-black text-3xl">Welcome,</p>
                <p className="text-black text-3xl">{user?.displayName}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <SongCard
                link="https://www.youtube.com/watch?v=iE9u7EjlgI8&list=PLR52GNCsgit_qaWjCNaUUi20AcooReAKX"
                badgeImage="https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/Trending%20Sound.png?alt=media&token=e9bcf3b2-e6a4-465d-92b0-9221d82d9a9e"
                songImage="https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/LD%20Soundscapes%20Artwork.png?alt=media&token=ce4fc862-68fa-437c-a6e3-7eb8897d8fb3"
                songName="LD Soundscapes - Space Age"
                title="Trending Now"
              />

              <SongCard
                link="https://www.youtube.com/watch?v=iE9u7EjlgI8&list=PLR52GNCsgit_qaWjCNaUUi20AcooReAKX"
                badgeImage="https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/New%20Sound.png?alt=media&token=d2a1ec99-2804-4ebb-9275-5fc3e935e5cb"
                songImage="https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/Sounds%20of%20Travel%20Artwork.png?alt=media&token=467d70b0-f873-4641-a6be-c7dc8118d217"
                songName="Sounds of Travel"
                title="Recent Release"
              />
            </div>

            <Insights analyticsData={analyticsData} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

const Insights = ({
  analyticsData,
  user,
}: {
  analyticsData: any;
  user: any;
}) => {
  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[date.getMonth()];

  return (
    <div className="col-span-1 relative mt-2">
      <Card className="mt-6">
        <CardHeader>
          <h2 className="text-2xl font-bold text-black">
            {monthName} 2024 Insights
          </h2>
        </CardHeader>
        <CardContent>
          {analyticsData === null ? (
            <>
              <h5>If no data is showing please analytics from the admin</h5>
              <p className="font-bold">
                In the email body please include your creator name
              </p>
              <Link
                href={`mailto:partnerships@tunetubepublishing.com?subject=${user?.displayName} is requesting their analytics`}
              >
                <Button className="mt-6 bg-blue-500">
                  Request your analytics
                </Button>
              </Link>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <SongCard
                link="https://www.youtube.com/watch?v=iE9u7EjlgI8&list=PLR52GNCsgit_qaWjCNaUUi20AcooReAKX"
                badgeImage="https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/Favorite%20Song.png?alt=media&token=85126710-d69a-4894-b116-48619341e3bb"
                songImage={analyticsData?.favSongPic}
                songName={analyticsData?.favSongAlbum}
                title="Favorite Song"
              />
              <div
                className="mt-4 space-y-4 col-span-1"
                style={{ fontFamily: "Avenir" }}
              >
                <p className="text-black text-xl">
                  <span className="font-semibold">Monthly Views: </span>
                  <span>{analyticsData?.monthlyViews}</span>
                </p>
                <p className="text-black text-xl">
                  <span className="font-semibold">LifeTime Views: </span>
                  <span>{analyticsData?.lifetimeViews}</span>
                </p>
                <p className="text-black text-xl">
                  <span className="font-semibold">RPM: </span>
                  <span>${analyticsData?.rpm}</span>
                </p>
                <p className="text-black text-xl">
                  <span className="font-semibold">TunePool Earnings: </span>
                  <span>${analyticsData?.tunePoolEarnings}</span>
                </p>
                <p className="text-black text-xl">
                  <span className="font-semibold">Reclaimed AdSense: </span>
                  <span>${analyticsData?.reclaimedAdSense}</span>
                </p>
                <p className="text-black text-xl">
                  <span className="font-semibold">
                    Total Monthly Earnings:{" "}
                  </span>
                  <span>${analyticsData?.totalMonthlyEarnings}</span>
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const SongCard = ({
  badgeImage,
  songImage,
  link,
  title,
  songName,
}: {
  badgeImage: string;
  songImage: string;
  link: string;
  title: string;
  songName: string;
}) => {
  return (
    <div className="relative col-span-1">
      <div className="absolute top-0 right-0 -mt-4 -mr-4">
        <Image src={badgeImage} alt="Trending Sound" width={60} height={60} />
      </div>
      <Card>
        <CardHeader>
          <p className="font-bold text-black text-lg">{title}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-black text-base">{songName}</p>
          <Image
            src={songImage}
            alt="Cover Art"
            width={100}
            height={100}
            className="rounded-lg"
          />
          <Button variant="outline">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/YouTube%20Shorts.png?alt=media&token=8fd2f3be-b55a-4f0a-ad24-6e766ece3458"
                alt="YouTube Shorts"
                width={30}
                height={30}
              />
              <p className="font-bold text-black text-lg">PLAY</p>
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
