import { Token, UserProfile } from "@/lib/models";

export type ApiPaths = {
  "/v1/user/login": {
    req: {
      email: string;
      password: string;
    };
    res: Token;
  };
  "/v1/user/signup": {
    req: {
      email: string;
      username: string;
      password: string;
    };
    res: Token;
  };
  "/v1/user/me": {
    res: UserProfile;
  };
};
