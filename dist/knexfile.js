"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "./src/database/database.db",
        },
        pool: {
            afterCreate: (conn, cb) => {
                conn.run("PRAGMA foreign_keys = ON", cb);
            },
        },
        useNullAsDefault: true,
        migrations: {
            extension: "ts",
            directory: "./src/database/migrations",
        },
        seeds: {
            extension: "ts",
            directory: "./src/database/seeds",
        },
    },
    production: {
        client: "sqlite3",
        connection: {
            filename: "./src/database/database.db",
        },
        pool: {
            min: 2,
            max: 10,
            afterCreate: (conn, cb) => {
                conn.run("PRAGMA foreign_keys = ON", cb);
            },
        },
        useNullAsDefault: true,
        migrations: {
            extension: "ts",
            directory: "./src/database/migrations",
        },
        seeds: {
            extension: "ts",
            directory: "./src/database/seeds",
        },
    },
};
exports.default = config;
