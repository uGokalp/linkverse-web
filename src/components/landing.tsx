import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        />
      </svg>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl blue-text">
            Seamlessly connect and manage your online presence.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 font-semibold">
            LinkVerse: The ultimate platform to effortlessly manage and connect
            all your online links.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button size="lg">
              <Link href="/register">Get started</Link>
            </Button>
          </div>
        </div>
        <div className="hidden md:flex mx-auto mt-16  max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="relative flex justify-center h-[520px] w-[250px] border-4 border-black rounded-2xl shadow-2xl">
              <Image
                src="/mobile-profile.png"
                height={250}
                width={250}
                className="object-cover rounded-3xl m-3"
                alt="mobile profile"
              />

              <span className="absolute -right-1.5 top-20 border-2 border-black h-10 rounded-md"></span>

              <span className="absolute -left-1.5 top-16 border-2 border-black h-6 rounded-md"></span>
              <span className="absolute -left-1.5 top-32 border-2 border-black h-12 rounded-md"></span>
              <span className="absolute -left-1.5 top-48 border-2 border-black h-12 rounded-md"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
