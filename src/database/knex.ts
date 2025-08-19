import { knex as knexConfig } from "knex";
import config from "../../knexfile";

const environment = process.env.NODE_ENV || 'development';
const knex = knexConfig(config[environment]);

export { knex };
