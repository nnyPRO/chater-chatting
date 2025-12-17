// Files in the "pages" folder will automatically become URLs on web pages.

// This file in charged 
// /api/auth/signin (login page)

// /api/auth/signout (logout page)

// /api/auth/callback/google (when Google returns data after login)

// /api/auth/session (when React asks "Am I logged in?")

// /api/auth/error (when an error occurs)

import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth/next";

// send all requests to NextAuth for handling using rules from authOptions.
export default NextAuth(authOptions)