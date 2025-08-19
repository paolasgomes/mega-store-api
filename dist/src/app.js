"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json());
app.use(routes_1.routes);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
