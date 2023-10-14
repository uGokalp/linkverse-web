"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { ProfileFormSchema, ProfileFormValues } from "@/app/profile/form.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HelpTooltip } from "@/components/ui/help-tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/react-hook-form/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import useUpdateProfile, { useDeleteProfile } from "@/hooks/use-update-profile";
import { Url, UserProfile, UserProfileSchema } from "@/lib/models";
import { cn } from "@/lib/utils";
import deepEqual from "deep-equal";
import { ArrowDown, XIcon } from "lucide-react";
import { useSession } from "next-auth/react";

const convertUrlsToFieldArray = (urls: Url[]) => {
  return (
    urls
      .sort((a, b) => b.position - a.position)
      .map((url) => ({ url: url.url, title: url.title, image: url.image })) ||
    []
  );
};

type ProfileFormProps = {
  profile: UserProfile;
};

export function ProfileForm({ profile }: ProfileFormProps) {
  const session = useSession();
  const defaultValues: Partial<ProfileFormValues> = {
    username: profile.username,
    email: profile.email,
    photo: profile.photo,
    bio: profile.bio,
    urls: convertUrlsToFieldArray(profile.urls || []),
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove, swap } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const updateProfile = useUpdateProfile();
  const deleteProfile = useDeleteProfile();

  function onSubmit(data: ProfileFormValues) {
    const formProfile = UserProfileSchema.parse(profile);
    const isChanged = !deepEqual(formProfile, data);
    if (!isChanged) {
      toast({
        title: "No changes made.",
      });
    }
    if (isChanged && session.data?.token) {
      updateProfile
        .mutateAsync({ user: data, token: session.data?.token })
        .then(() => {
          toast({
            title: "Profile updated!",
          });
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        });
    }
  }

  type OnErrorFn = Parameters<typeof form.handleSubmit>["1"];
  const onError: OnErrorFn = (err) => {
    console.log(err);
    const description = Object.values(err)
      .map((v) => v)
      .join("\n");
    toast({
      title: "Error",
      description,
      variant: "destructive",
    });
  };

  const avatarChanged = !deepEqual(profile.photo, form.getValues("photo"));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-3"
      >
        <Avatar className="h-32 w-32">
          <AvatarImage
            src={avatarChanged ? form.getValues("photo") || "" : profile.photo}
          />
          <AvatarFallback>No Image</AvatarFallback>
        </Avatar>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Url</FormLabel>
              <FormControl>
                <Input {...field} type="url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormItem key={field.id}>
              <FormLabel className={cn(index !== 0 && "sr-only")}>
                URLs
              </FormLabel>
              <FormDescription className={cn(index !== 0 && "sr-only")}>
                Add links to your website, blog, or social media profiles.
              </FormDescription>
              <FormControl>
                <Card>
                  <div className="pt-4">
                    <div className="flex justify-end mr-5">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-sm text-slate-600 hover:text-slate-800"
                      >
                        <XIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <CardContent>
                    <div className="grid w-full items-center gap-4">
                      <FormField
                        name={`urls.${index}.url`}
                        control={form.control}
                        render={({ field }) => (
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Url</Label>
                            <Input {...field} />
                          </div>
                        )}
                      />
                      <FormField
                        name={`urls.${index}.title`}
                        control={form.control}
                        render={({ field }) => (
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Title</Label>
                            <Input {...field} />
                          </div>
                        )}
                      />
                      <FormField
                        name={`urls.${index}.image`}
                        control={form.control}
                        render={({ field }) => (
                          <div className="flex flex-col space-y-1.5">
                            <div className="flex items-center space-x-2">
                              <Label htmlFor="name">Image</Label>
                              <HelpTooltip message="Add image url." />
                            </div>
                            <div className="flex items-center gap-2">
                              {field.value && (
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={field.value} />
                                  <AvatarFallback>No Image</AvatarFallback>
                                </Avatar>
                              )}
                              <Input {...field} type="url" />
                            </div>
                          </div>
                        )}
                      />
                    </div>
                  </CardContent>
                  {index < fields.length - 1 && fields.length > 1 && (
                    <div className="pb-4">
                      <div className="flex justify-end mr-5">
                        <button
                          type="button"
                          onClick={() => swap(index, index + 1)}
                          className="text-sm text-slate-600 hover:text-slate-800"
                        >
                          <ArrowDown className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </Card>
              </FormControl>
              <FormMessage />
            </FormItem>
          ))}
          <Button
            type="button"
            variant="link"
            size="sm"
            className="mt-1"
            onClick={() => append({ url: "", image: "", title: "" })}
          >
            Add URL
          </Button>
        </div>
        <Button type="submit">Update profile</Button>
      </form>
      <Button
        variant="destructive"
        type="button"
        onClick={() =>
          deleteProfile.mutate({ token: session.data?.token as string })
        }
      >
        Delete profile
      </Button>
    </Form>
  );
}
