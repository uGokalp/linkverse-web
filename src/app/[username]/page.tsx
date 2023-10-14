import LinkCard from "@/app/[username]/link-card";
import BackendService from "@/lib/backend";
import Image from "next/image";

const getData = async (username: string) => {
  const profile = await BackendService.getUsername(username);
  return profile;
};

export default async function Home({
  params,
}: {
  params: { username: string };
}) {
  console.log(params);
  const profile = await getData(params.username);
  return (
    <div className="background-image">
      <section className="bg-ct-blue-600 min-h-screen pt-[3rem] md:pt-[1rem]">
        <div className="max-w-2xl mx-auto bg-ct-dark-100 rounded-md h-[15rem] flex justify-center items-center mb-[2rem] md:mb-2">
          {profile && (
            <div>
              <div className="flex flex-col justify-center items-center gap-2">
                <Image
                  className="rounded-full h-32 w-32 ring-1 ring-[#1e71f5] "
                  src={profile.photo}
                  alt="profile"
                  width={128}
                  height={128}
                />
                <p className="text-3xl font-semibold blue-text">
                  {profile.username}
                </p>
                <p className="text-xl font px-4 text-center">{profile.bio}</p>
              </div>
            </div>
          )}
        </div>
        {profile &&
          profile.urls &&
          profile.urls.map((url) => <LinkCard data={url} key={url.ID} />)}
      </section>
    </div>
  );
}
