
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateWarehouseDto } from "../dtos/create-warehouse.dto";
import { UpdateWarehouseDto } from "../dtos/update-warehouse.dto";
import { DATABASE_CONNECTION } from "src/db/db.module";
import { Kysely } from "kysely";
import { DB } from "db/db";

@Injectable()
export class WarehousesService {
    constructor(@Inject(DATABASE_CONNECTION) private readonly db: Kysely<DB>) { }

    async create(data: CreateWarehouseDto) {
        return await this.db.insertInto('warehouses')
            .values(data)
            .returningAll()
            .executeTakeFirst();
    }

    async findAll() {
        return await this.db.selectFrom('warehouses')
            .selectAll()
            .execute();
    }

    async findById(id: string) {
        return await this.db.selectFrom('warehouses')
            .selectAll()
            .where('id', '=', id)
            .executeTakeFirst();
    }

    async update(id: string, data: UpdateWarehouseDto) {
        try {
            return await this.db.updateTable('warehouses')
                .set(data)
                .where('id', '=', id)
                .returningAll()
                .executeTakeFirstOrThrow();
        } catch (error) {
            throw new NotFoundException(`Warehouse with ID ${id} not found`);
        }
    }

    async delete(id: string) {
        try {
            await this.db.deleteFrom('warehouses')
                .where('id', '=', id)
                .executeTakeFirst();
        } catch (error) {
            throw new NotFoundException(`Warehouse with ID ${id} not found`);
        }
    }
}
