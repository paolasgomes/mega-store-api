import { knex } from "../../../database/knex";
import { NextFunction, Request, Response } from "express";

const getById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const user = await knex("users").where({ id }).first();

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const address = await knex("address").where({ id: user.address_id }).first();

    res.status(200).json({ ...user, address });
  } catch (error) {
    res.status(500).json({ error });
    next(error);
  }
};

export { getById };
