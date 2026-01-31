import { Inject, Injectable } from "@nestjs/common";
import { CreateWarehouseAdminParams, UpdateWarehouseAdminParams } from "../utils/service/Types";
import { DATABASE_CONNECTION } from "src/db/db.module";
import { Kysely } from "kysely";
import { DB } from "../../../db/db"
import bcrypt from 'bcrypt'

@Injectable()
export class WarehouseAdminService {
    constructor(@Inject(DATABASE_CONNECTION) private readonly db: Kysely<DB>) { }

    async findById(id: string, warehouse_id?: string) {
        return await this.db.selectFrom('warehouseadmins')
            .selectAll()
            .where('id', '=', id)
            .$if(warehouse_id !== undefined, (qb) => qb.where('warehouse_id', '=', warehouse_id!))
            .executeTakeFirst();
    }

    async findByEmail(email: string, warehouse_id?: string) {
        return await this.db.selectFrom('warehouseadmins')
            .selectAll()
            .where('email', '=', email)
            .$if(warehouse_id !== undefined, (qb) => qb.where('warehouse_id', '=', warehouse_id!))
            .executeTakeFirst();
    }

    async findAll(warehouse_id?: string) {
        return await this.db.selectFrom('warehouseadmins')
            .selectAll()
            .$if(warehouse_id !== undefined, (qb) => qb.where('warehouse_id', '=', warehouse_id!))
            .execute();
    }

    async create(data: CreateWarehouseAdminParams) {
        const passwordHash = await bcrypt.hash(data.password, 10)
        const insertableData = {
            name: data.name,
            email: data.email,
            password_hash: passwordHash,
            warehouse_id: data.warehouseId
        }

        try {
            return await this.db.insertInto('warehouseadmins')
                .values(insertableData)
                .returningAll()
                .executeTakeFirst();
        } catch (error) {
            throw new Error(`Failed to create Warehouse Admin: ${error}`);
        }
    }

    async update(id: string, data: UpdateWarehouseAdminParams, warehouse_id?: string) {
        const updateableData = { ...data };
        if (data.password) {
            const passwordHash = await bcrypt.hash(data.password, 10)
            updateableData['password_hash'] = passwordHash;
        }

        try {
            return await this.db.updateTable('warehouseadmins')
                .set(updateableData)
                .where('id', '=', id)
                .$if(warehouse_id !== undefined, (qb) => qb.where('warehouse_id', '=', warehouse_id!))
                .executeTakeFirst();
        } catch (error) {
            throw new Error(`Failed to update Warehouse Admin with ID ${id}: ${error}`);
        }
    }

    async delete(id: string, warehouse_id?: string) {
        try {
            await this.db.deleteFrom('warehouseadmins')
                .where('id', '=', id)
                .$if(warehouse_id !== undefined, (qb) => qb.where('warehouse_id', '=', warehouse_id!))
                .executeTakeFirst();
        } catch (error) {
            throw new Error(`Failed to delete Warehouse Admin with ID ${id}: ${error}`);
        }
    }

    async getRegionId(id: string) {
        const result = await this.db.selectFrom('warehouseadmins')
            .innerJoin('warehouses', 'warehouseadmins.warehouse_id', 'warehouses.id')
            .select('warehouses.region_id')
            .where('warehouseadmins.id', '=', id)
            .executeTakeFirst();

        return result?.region_id;
    }
}