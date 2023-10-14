import { z } from "zod";

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
