import z from "zod";

const createUserSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres." })
    .max(100, "Nome deve ter no máximo 100 caracteres."),
  email: z.email({ message: "Email inválido." }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres." })
    .max(100, { message: "Senha deve ter no máximo 100 caracteres." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
      message:
        "Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.",
    }),
});

export { createUserSchema };
