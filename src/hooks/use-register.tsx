import { toast } from "@/components/ui/use-toast";
import BackendService, { RegisterFormValues } from "@/lib/backend";
import { useMutation } from "@tanstack/react-query";

const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterFormValues) => {
      const res = await BackendService.register(data);
      return res;
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Account created successfully",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export default useRegister;
