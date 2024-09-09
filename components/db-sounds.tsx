"use client";

import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { config } from "@/config/base";
import { initializeApp } from "firebase/app";
import { useAuth } from "@/app/auth/AuthContext"; // Ensure this is the correct path to your AuthContext

// Define the expected shape of sound data
interface Sound {
  title: string;
  albumTitle: string;
  mood: string[];  // Mood is an array of strings
  songUrl: string;
  artUrl: string;
}

const firebaseApp = initializeApp(config.firebase); // Initialize Firebase app
const db = getFirestore(firebaseApp); // Initialize Firestore

const DbSoundsPage = () => {
  const { user } = useAuth(); // Get authenticated user from context
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Logging the user data to debug authentication
  console.log("Authenticated user:", user);

  useEffect(() => {
    if (!user) {
      console.log("No user is authenticated.");
      return; // Skip fetching data if no user is authenticated
    }

    const fetchSounds = async () => {
      try {
        console.log("Fetching sounds from Firestore for user:", user?.email);

        const soundsCollection = collection(db, "sounds");
        const soundSnapshot = await getDocs(soundsCollection);

        const soundList = soundSnapshot.docs.map((doc) => {
          console.log("Fetched sound document:", doc.data());  // Log each document
          return doc.data() as Sound;
        });

        setSounds(soundList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sounds:", error);
        setLoading(false);
      }
    };

    fetchSounds();
  }, [user]); // Fetch data when the user is authenticated

  const filteredSounds = sounds.filter((sound) =>
    sound.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sound.mood.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!user) {
    return <p>Please sign in to view the sounds.</p>; // Display message if user is not signed in
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6">
        <input
          type="text"
          placeholder="Search sounds by title or mood..."
          className="mb-6 p-3 w-full border rounded-md"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {loading ? (
          <p>Loading sounds...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredSounds.length > 0 ? (
              filteredSounds.map((sound, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                  <img
                    src={sound.artUrl}
                    alt={sound.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{sound.title}</h3>
                  <p>{sound.albumTitle}</p>
                  <p className="text-sm text-gray-600">
                    {sound.mood.join(", ")}
                  </p>
                </div>
              ))
            ) : (
              <p>No sounds found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DbSoundsPage;
