import { NextFunction, Request, Response } from "express";
import { hash } from "bcrypt";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { knex } from "../../../database/knex";
import { User } from "../types";

const create = async (req: Request, res: Response, next: NextFunction) => {
  const schema = z.object({
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

  const { name, email, password }: User = req.body;

  const validation = schema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ error: z.treeifyError(validation.error).properties });
  }

  const emailExists = await knex("users").where({ email }).first();

  if (Boolean(emailExists)) {
    return res.status(409).json({ error: "Email já está em uso." });
  }

  try {
    const hashedPassword = await hash(password, 10);

    const user = {
      id: randomUUID(),
      name,
      email,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: null,
    };

    await knex<User>("users").insert(user);

    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (error) {
    next(error);
  }
};

export { create };
