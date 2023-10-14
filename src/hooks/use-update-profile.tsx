import { ProfileFormValues } from "@/app/profile/form.types";
import BackendService from "@/lib/backend";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateProfile = () => {
  const client = useQueryClient();
  return useMutation(
    async ({
      user,
      token,
    }: { user: ProfileFormValues } & { token: string }) => {
      const data = await BackendService.updateProfile(token, user);
      return data;
    },
    {
      onSuccess: () => {
        client.invalidateQueries(["profile"]);
      },
    }
  );
};

export const useDeleteProfile = () => {
  const client = useQueryClient();
  return useMutation(
    async ({ token }: { token: string }) => {
      const data = await BackendService.deteteUser(token);
      return data;
    },
    {
      onSuccess: () => {
        client.invalidateQueries(["profile"]);
      },
    }
  );
};

export default useUpdateProfile;
