import z, { email } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(1, { message: "Password is required" }).trim(),
});

export const RegisterFormSchema = z
  .object({
    first_name: z
      .string()
      .min(1, { message: "First name is required" })
      .min(2, { message: "First name must be at least 2 characters" })
      .max(50, { message: "First name must be less than 50 characters" })
      .regex(/^[A-Za-z]+$/, {
        message: "First name must contain only letters",
      })
      .trim(),
    last_name: z
      .string()
      .min(1, { message: "First name is required" })
      .min(2, { message: "First name must be at least 2 characters" })
      .max(50, { message: "First name must be less than 50 characters" })
      .regex(/^[A-Za-z]+$/, {
        message: "First name must contain only letters",
      })
      .trim(),
    email: z
      .string()
      .min(1, { message: "Password is required" })
      .email({ message: "Invalid email address" })
      .trim(),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(5, { message: "Password must be at least 5 characters" })
      .max(32, { message: "Password must be less than 32 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .trim(),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const BlogPostSchema = z.object({
  content: z.string().min(1, { message: "Content is required" }).trim(),
});
export const diariesSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be less than 100 characters" })
    .trim(),
  content: z.string().min(1, { message: "Content is required" }).trim(),
});
export const UpdateProfileSchema = z
  .object({
    first_name: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" })
      .max(50, { message: "First name must be less than 50 characters" })
      .regex(/^[A-Za-z]+$/, { message: "First name must contain only letters" })
      .trim()
      .optional(),
    last_name: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" })
      .max(50, { message: "Last name must be less than 50 characters" })
      .regex(/^[A-Za-z]+$/, { message: "Last name must contain only letters" })
      .trim()
      .optional(),
    password: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z
        .string()
        .min(5, { message: "Password must be at least 5 characters" })
        .regex(/[A-Z]/, {
          message: "Password must contain at least one uppercase letter",
        })
        .regex(/[a-z]/, {
          message: "Password must contain at least one lowercase letter",
        })
        .regex(/[0-9]/, {
          message: "Password must contain at least one number",
        })
        .trim()
        .optional()
    ),

    confirmPassword: z.string().trim().optional(),
  })
  .refine(
    (data) => {
      if (data.password) return data.password === data.confirmPassword;
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );
