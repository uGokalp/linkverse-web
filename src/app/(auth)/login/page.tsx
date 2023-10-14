"use client";

import { UserAuthForm } from "@/app/(auth)/login/form";
import { ErrorMessages } from "@/app/(auth)/login/msg-mapping";
import Header from "@/components/header";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthenticationPage() {
  const router = useRouter();
  const handleCredentialLogin = async (data: any) => {
    signIn("credentials", {
      ...data,
      callbackUrl: "/profile",
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          toast({
            title: "Error",
            description: ErrorMessages[res?.error],
            variant: "destructive",
          });
        }
        else if (res) {
          if (res.ok) {
            router.push(res.url!);
          } else {
            alert(res.error);
            // router.push(`/auth/signup?error=${res.error}`);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <div className="lg:p-8 mx-auto px-6 py-12 h-full flex justify-center items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to log on to your account
            </p>
          </div>
          <UserAuthForm handleLogin={handleCredentialLogin} />
        </div>
      </div>
    </>
  );
}
