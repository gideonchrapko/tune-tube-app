/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "lh3.googleusercontent.com",
      "storage.googleapis.com",
      "tune-tube-app-next.appspot.com",
    ],
  },
  // env: {
  //   FIREBASE_PRIVATE_KEY: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(
  //     /\\n/g,
  //     "\n",
  //   ),
  //   FIREBASE_CLIENT_EMAIL: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
  //   FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_API_KEY,
  //   COOKIE_SECRET_CURRENT: process.env.COOKIE_SECRET_CURRENT,
  //   COOKIE_SECRET_PREVIOUS: process.env.COOKIE_SECRET_PREVIOUS,
  // },
};

export default nextConfig;
``;
