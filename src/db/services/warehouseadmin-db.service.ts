import { Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { DB } from "../../../db/db";

@Injectable()
export class WarehouseAdminDBService {
    constructor(private readonly db: Kysely<DB>) { }


}