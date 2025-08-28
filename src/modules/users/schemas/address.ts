import z from "zod";

const addressSchema = z.object({
  street: z.string().min(2).max(100),
  number: z.string().min(1).max(10),
  city: z.string().min(2).max(100),
  state: z.string().min(2).max(100),
  zip_code: z.string().min(5).max(10),
});

export { addressSchema };
