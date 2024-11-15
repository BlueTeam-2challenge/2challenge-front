import { z } from "zod";

const LocationSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

export const animalFormSchema = z.object({
  petName: z
    .string()
    .min(2, "Pet name needs to be longer than 2 characters")
    .max(100),
  description: z
    .string()
    .min(10, "Description needs to be longer than 10 characters")
    .max(500),
  address: z.string().min(3, "Enter a Valid Address").max(200),
  category: z
    .string()
    .min(2)
    .max(100)
    .refine((field) => field !== "select", {
      message: "Please select a category",
    }),
  location: LocationSchema,
  createdBy: z.string().min(2, "Enter a valid user"),
});
export type AnimalSchema = z.infer<typeof animalFormSchema>;
