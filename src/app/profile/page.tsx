"use client";
import { ProfileForm } from "@/app/profile/form";
import { ShareLink } from "@/app/profile/share-link";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useProfile from "@/hooks/use-profile";

export default function Profile() {
  const profile = useProfile();
  const baseUrl =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const url = profile.data
    ? new URL(profile.data?.username, baseUrl).toString()
    : "";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
        <div className="pt-5">
          {profile.data ? <ShareLink link={url} /> : null}
        </div>
      </div>
      <Separator />
      {profile.data ? <ProfileForm profile={profile.data} /> : <Skeleton />}
    </div>
  );
}
