"use client";
import { UserAuthForm } from "@/app/(auth)/register/form";
import Header from "@/components/header";
import { toast } from "@/components/ui/use-toast";
import useRegister from "@/hooks/use-register";
import { RegisterFormValues } from "@/lib/backend";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const register = useRegister();

  const handleCredentialSignup = async (data: RegisterFormValues) => {
    const res = await register.mutateAsync(data);
    if (res.status === 200) {
      router.push("/profile");
    } else {
      toast({
        title: "Error",
        description: "Error signing up",
      });
    }
  };
  return (
    <>
      <Header />
      <div className="lg:p-8 mx-auto px-6 py-12 h-full flex justify-center items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm handleSignup={handleCredentialSignup} />
        </div>
      </div>
    </>
  );
}
