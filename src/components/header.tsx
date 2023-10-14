"use client";
import { Skeleton } from "@/components/ui/skeleton";
import useProfile from "@/hooks/use-profile";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const profile = useProfile();

  return (
    <header className="bg-white pt-5">
      <nav className="h-full flex justify-between container items-center">
        <div>
          <Link
            href="/"
            className="text-ct-dark-600 text-5xl font-semibold blue-text"
          >
            <Image
              src="/logo.svg"
              alt="Google"
              width={200}
              height={100}
              priority
              style={{ width: "100%", height: "auto" }}
            />
          </Link>
        </div>
        {status === "loading" ? (
          <Skeleton className="w-[100px] md:w-[250px] h-[20px] rounded-full" />
        ) : (
          <ul className="flex flex-col md:flex-row items-center gap-4 space-x-3">
            {!user && (
              <>
                <li>
                  <Link
                    href="/login"
                    className="text-ct-dark-600 font-semibold text-xl"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-ct-dark-600 font-semibold text-xl"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <Link
                    href={`/${profile.data?.username}`}
                    className="text-ct-dark-600 font-semibold text-xl blue-text"
                  >
                    <span>✨</span>
                    <span>Profile</span>
                    <span>✨</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="text-ct-dark-600 font-semibold text-xl"
                  >
                    Manage
                  </Link>
                </li>
                <li
                  className="cursor-pointer font-semibold text-xl"
                  onClick={() => signOut()}
                >
                  Logout
                </li>
              </>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
