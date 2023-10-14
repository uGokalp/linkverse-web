import { z } from "zod";

export const UserProfileSchema = z.object({
  bio: z.string(),
  photo: z.string(),
  username: z.string(),
  email: z.string(),
  urls: z
    .array(
      z.object({
        url: z.string(),
        title: z.string(),
        image: z.string(),
      })
    )
    .optional(),
});

export type Token = {
  token: string;
};

export type UserProfile = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: any;
  bio: string;
  name: string;
  photo: string;
  username: string;
  password: string;
  email: string;
  urls?: Url[];
};

export interface Url {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: any;
  userId: number;
  url: string;
  title: string;
  image: string;
  position: number;
}
