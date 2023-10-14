import BackendService from "@/lib/backend";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useProfile = () => {
  const { data: session } = useSession();
  const token = session?.token;
  return useQuery(
    ["profile"],
    async () => {
      const res = await BackendService.getProfile(token);
      return res;
    },
    {
      enabled: Boolean(token),
      retry: false,
    }
  );
};

export default useProfile;
