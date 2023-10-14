import { ProfileFormValues } from "@/app/profile/form.types";
import { ApiPaths } from "@/lib/paths";
import axios from "axios";
import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  username: z.string().min(3),
});
export type RegisterFormValues = z.infer<typeof RegisterSchema>;

class Backend {
  host = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  async login(email: string, password: string) {
    const response = await axios.post<ApiPaths["/v1/user/login"]["res"]>(
      `${this.host}/v1/user/login`,
      {
        email,
        password,
      }
    );
    return response.data;
  }

  async register({ email, password, username }: RegisterFormValues) {
    const response = await axios.post<ApiPaths["/v1/user/signup"]["res"]>(
      `${this.host}/v1/user/signup`,
      {
        email,
        password,
        username,
      }
    );

    return response;
  }

  async getProfile(token: string | undefined) {
    if (token === undefined) {
      return Promise.reject(new Error("Not authenticated"));
    }
    const response = await axios.get<ApiPaths["/v1/user/me"]["res"]>(
      `${this.host}/v1/user/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }

  async updateProfile(token: string, profile: ProfileFormValues) {
    const response = await axios.put<ApiPaths["/v1/user/me"]["res"]>(
      `${this.host}/v1/user/me`,
      profile,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }

  async getUsername(username: string) {
    const response = await axios.get<ApiPaths["/v1/user/me"]["res"]>(
      `${this.host}/v1/username`,
      {
        params: { username },
      }
    );
    return response.data;
  }

  async deteteUser(token: string) {
    const response = await axios.delete(`${this.host}/v1/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
}

const BackendService = new Backend();
export default BackendService;
