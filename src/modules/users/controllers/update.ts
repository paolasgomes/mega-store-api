import { NextFunction, Request, Response } from "express";
import { knex } from "../../../database/knex";
import { addressSchema } from "../schemas/address";
import z from "zod";
import { updateUserTransation } from "../transactions/update";
import { updateUserSchema } from "../schemas/update-user";

const update = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const userExists = await knex("users").where({ id }).first();

  if (!userExists) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }

  const {
    name,
    email,
    password,
    phone,
    address: { city, state, street, number, zip_code },
  } = req.body;

  const userValidation = updateUserSchema.safeParse(req.body);

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

  const user = {
    id,
    name,
    email,
    password,
    phone,
    address_id: userExists.address_id,
    updated_at: new Date(),
  };

  const address = {
    id: userExists.address_id,
    street,
    number,
    city,
    state,
    zip_code,
    updated_at: new Date(),
  };

  try {
    await updateUserTransation({ user, address });

    res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  } catch (error) {
    res.json({ error });
    next(error);
  }
};

export { update };
