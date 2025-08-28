import z from "zod";

const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres." })
    .max(100, "Nome deve ter no máximo 100 caracteres."),
  email: z.email({ message: "Email inválido." }),
  password: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;

        return (
          value.length >= 6 &&
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(value)
        );
      },
      {
        message:
          "Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.",
      }
    ),
});

export { updateUserSchema };
