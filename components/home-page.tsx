"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <main className="bg-[#f0f4f7] h-screen flex flex-col justify-center items-center relative perspective-[1000px] overflow-hidden">
      <div className="flex justify-center items-center mt-[50px]">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/Intro.png?alt=media&token=5a3bf77f-08bc-4c76-ac77-6fe3928ba25c"
          alt="Intro Text"
          width={800}
          height={800}
          priority
        />
      </div>

      <a
        href="mailto:sync@tunetube.vip"
        className="absolute bottom-[70px] px-[30px] py-[10px] border-2 border-black rounded-full bg-transparent text-black text-sm font-bold cursor-pointer uppercase tracking-[2px] transition-transform duration-300 ease-in-out hover:scale-110"
      >
        Connect
      </a>

      <div className="cloudLeft absolute w-[200px] h-[200px] top-[20%] left-[-300px] animate-moveCloudsLeft">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/Blue%20Background%20(2).png?alt=media&token=827a62ca-b90b-495d-a5f3-f71226d1fee6"
          alt="Cloud Left"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="cloudRight absolute w-[150px] h-[150px] top-[60%] right-[100px] animate-moveCloudsRight">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/Blue%20Background.png?alt=media&token=bdc1ee69-fdb0-4daa-a802-e8647732c8ea"
          alt="Cloud Right"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </main>
  );
}
