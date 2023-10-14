"use client";

import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/react-hook-form/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  handleSignup: (data: any) => void;
}

const registerFormSchema = z
  .object({
    email: z
      .string({
        required_error: "Please select an email to display.",
      })
      .email(),
    username: z
      .string({
        required_error: "Please select a username to display.",
      })
      .min(2, "Username must be at least 2 characters long."),
    password: z
      .string({
        required_error: "Please enter a password.",
      })
      .min(1, "Password must be at least 1 characters long."),
    password2: z
      .string({
        required_error: "Please enter the same password again.",
      })
      .min(1, "Password must be at least 1 characters long."),
  })
  .superRefine((data, ctx) => {
    if (data.password && data.password2 && data.password !== data.password2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
        path: ["password"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
        path: ["password2"],
      });
    }
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export function UserAuthForm({
  className,
  handleSignup,
  ...props
}: UserAuthFormProps) {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      password2: "",
    },
    mode: "onChange",
  });
  const isLoading =
    form.formState.isSubmitting || form.formState.isSubmitSuccessful;

  async function onSubmit(data: RegisterFormValues) {
    return handleSignup({
      email: data.email,
      username: data.username,
      password: data.password,
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <div className="grid gap-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-1">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email"/>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-1">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-1">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password2"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-1">
                      <FormLabel>Password Again</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign Up with Email
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
