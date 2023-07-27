"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div>
     {
        session?.user?(
            <>
            <div className="font-bold flex items-center justify-center gap-2 my-4 text-2xl">
            <img
              src={session?.user?.image}
              className="h-[80px] rounded-full"
              alt="user image"
            />
            <p>{session?.user?.name}</p>
          </div>
          <button
            onClick={() => signOut()}
            type="submit"
            className="block m-auto w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Sign Out
          </button>
        </>
            ):<button
            onClick={() => router.push('/login')}
            type="submit"
            className="block m-auto w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Sign IN
          </button>
        }
        </div>
  );
};

export default Dashboard;
