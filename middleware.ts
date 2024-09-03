import { NextRequest } from "next/server";
import { auth } from "./auth";

export default auth((req: NextRequest) => {
  // Your middleware logic here
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
