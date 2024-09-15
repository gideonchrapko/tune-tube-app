"use server";

import type { CountryCode } from "libphonenumber-js";
import { headers } from "next/headers";

export async function getGeolocation() {
  const headersList = headers();
  const ipCountry = headersList.get(
    "x-vercel-ip-country",
  ) as CountryCode | null;

  return ipCountry;
}
