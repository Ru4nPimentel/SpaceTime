import { Copyright } from "@/components/Copyright";
import EmptyMemories from "@/components/EmptyMemories";
import { Hero } from "@/components/Hero";
import { Profile } from "@/components/Profile";
import { SignIn } from "@/components/SignIn";
import { cookies } from "next/headers";

export default function Home() {
  const isAuthenticated = cookies().has("token");
  return (
    <main className="grid grid-cols-2 min-h-screen">
      {/* Left */}
      <div className="relative flex flex-col items-start justify-between px-28 py-16 overflow-hidden border-white bg-[url(../assets/bg-stars.svg)] bg-cover">
        {/* Bluer */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] bg-purple-700 opacity-50 -translate-y-1/2 translate-x-1/2 rounded-full blur-full"></div>

        {/* Stripes */}
        <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes "></div>

        {/* sign in */}
        {isAuthenticated ? <Profile /> : <SignIn />}

        {/* Hero */}
        <Hero />

        {/* Copyright */}
        <Copyright />
      </div>

      {/* Right */}
      <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
        <EmptyMemories />
      </div>
    </main>
  );
}
