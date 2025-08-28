import { Request, Response } from "express";
import { knex } from "../../../database/knex";
import bcrypt from "bcrypt";
import { User } from "../../users/types/user";
import { sign } from "jsonwebtoken";

const index = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log("Login attempt for:", email);

  if (!email || !password) {
    return res.status(400).json({ error: "Email e password são obrigatórios." });
  }

  try {
    const user: User | undefined = await knex("users")
      .select("*")
      .where({ email })
      .first();

    if (!user) {
      return res.status(404).json({ error: "Email e/ou senha incorretos" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Email e/ou senha incorretos" });
    }

    const token = sign({ userId: user.id }, "secret-key", {
      expiresIn: "1h",
    });

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

export { index };
