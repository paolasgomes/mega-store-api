import { NextFunction, Request, Response } from "express";
import { hash } from "bcrypt";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { knex } from "../../../database/knex";
import { createUserSchema } from "../schemas/create-user";
import { addressSchema } from "../schemas/address";
import { createUserTransation } from "../transactions/create";

const create = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    email,
    password,
    phone,
    address: { city, state, street, number, zip_code },
  } = req.body;

  const userValidation = createUserSchema.safeParse(req.body);

  const addressValidation = addressSchema.safeParse(req.body.address);

  if (!userValidation.success) {
    return res
      .status(400)
      .json({ error: z.treeifyError(userValidation.error).properties });
  }

  if (!addressValidation.success) {
    return res
      .status(400)
      .json({ error: z.treeifyError(addressValidation.error).properties });
  }

  const emailExists = await knex("users").where({ email }).first();

  if (Boolean(emailExists)) {
    return res.status(409).json({ error: "Email já está em uso." });
  }

  try {
    const hashedPassword = await hash(password, 10);

    const address = {
      id: randomUUID(),
      street: street,
      number: number,
      city: city,
      state: state,
      zip_code: zip_code,
    };

    const user = {
      id: randomUUID(),
      name,
      email,
      password: hashedPassword,
      phone,
      address_id: address.id,
    };

    await createUserTransation({ user, address });

    res.status(201).json({ message: "Usuário criado!" });
  } catch (error) {
    console.error("❌ Erro geral:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
    next(error);
  }
};

export { create };
