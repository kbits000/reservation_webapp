import { z } from "zod";

export interface NewUserFormData {
    name: string;
    email: string;
    phoneNumber: string;
    sex: string;
    role: string;
}

export interface ActionResponse {
    success: boolean;
    message: string;
    errors?: {
      [K in keyof NewUserFormData]?: string[];
    };
    emailExists?: boolean;
  }
  

export const UserRegistrationSchema = z.object({
    id: z.number().optional(),
    name: z.string().trim(),
    email: z.string().trim().email({ message: "Invalid email address" }),
    phoneNumber: z.string().trim(),
    sex: z.enum(["male", "female"]),
    role: z.string().trim().transform((val) => val || "user")
})

export type UserRegistration = z.infer<typeof UserRegistrationSchema>;