"use client";

import { Url } from "@/lib/models";
import Image from "next/image";

const BaseIcon = () => (
  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
    ></path>
  </svg>
);

type Props = {
  data: Url;
};

const LinkCard = (props: Props) => {
  return (
    <a href={props.data.url}>
      <div className="flex flex-col justify-center relative overflow-hidden py-5">
        <div className="max-w-3xl mx-auto">
          <div className="relative group min-w-[300px] md:min-w-[500px]">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center justify-start space-x-6">
              {props.data.image ? (
                <Image src={props.data.image} width={32} height={32} alt={""} />
              ) : (
                <BaseIcon />
              )}
              <div className="text-center">
                <p className="text-slate-800 font-semibold">
                  {props.data.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default LinkCard;
