import { PostgresDialect } from "kysely";
import {Pool} from "pg";
import { Kysely } from "kysely";
import { DB } from "../../db/db";

export async function getDB() {
    const dialect = new PostgresDialect({
        pool: new Pool({
            database: 'pharmachain',
            host: 'localhost',
            user: 'postgres',
            password: 'postgres',
            port: 5432,
            max: 10,
        }),
    });

    return new Kysely<DB>({ dialect });
}