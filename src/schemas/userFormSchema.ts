import { z } from "zod";

export const userFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().min(1, "Required Field").email("Choose a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((field) => field.password === field.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type userFormSchema = z.infer<typeof userFormSchema>;
