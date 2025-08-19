"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const bcrypt_1 = require("bcrypt");
const node_crypto_1 = require("node:crypto");
const zod_1 = require("zod");
const knex_1 = require("../../../database/knex");
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = zod_1.z.object({
        name: zod_1.z
            .string()
            .min(2, { message: "Nome deve ter pelo menos 2 caracteres." })
            .max(100, "Nome deve ter no máximo 100 caracteres."),
        email: zod_1.z.email({ message: "Email inválido." }),
        password: zod_1.z
            .string()
            .min(6, { message: "Senha deve ter pelo menos 6 caracteres." })
            .max(100, { message: "Senha deve ter no máximo 100 caracteres." })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
            message: "Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.",
        }),
    });
    const { name, email, password } = req.body;
    const validation = schema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: zod_1.z.treeifyError(validation.error).properties });
    }
    const emailExists = yield (0, knex_1.knex)("users").where({ email }).first();
    console.log("Email exists => ", emailExists);
    if (Boolean(emailExists)) {
        return res.status(409).json({ error: "Email já está em uso." });
    }
    try {
        const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
        const user = {
            id: (0, node_crypto_1.randomUUID)(),
            name,
            email,
            password: hashedPassword,
            created_at: new Date(),
            updated_at: null,
        };
        yield (0, knex_1.knex)("users").insert(user);
        res.status(201).json({ message: "Usuário criado com sucesso!" });
    }
    catch (error) {
        next(error);
    }
});
exports.create = create;
