"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const create_1 = require("../controllers/create");
const usersRouter = (0, express_1.Router)();
exports.usersRouter = usersRouter;
usersRouter.post("/", create_1.create);
