import { z } from "zod";

export const ProfileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  photo: z.string().url({ message: "Please enter a valid URL." }),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        url: z.string().url({ message: "Please enter a valid URL." }),
        title: z.string({ required_error: "Please enter a title." }),
        image: z.string().optional(),
      })
    )
    .optional(),
});

export type ProfileFormValues = z.infer<typeof ProfileFormSchema>;
