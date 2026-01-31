import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateStoreAdminParams, UpdateStoreAdminParams } from "../utils/service/Types";
import { DATABASE_CONNECTION } from "src/db/db.module";
import { Kysely } from "kysely";
import { DB } from "../../../db/db"
import bcrypt from 'bcrypt'

@Injectable()
export class StoreAdminService {
    constructor(@Inject(DATABASE_CONNECTION) private readonly db: Kysely<DB>) { }

    async findById(id: string, warehouse_id?: string) {
        return await this.db.selectFrom('storeadmins')
            .selectAll()
            .where('id', '=', id)
            .$if(warehouse_id !== undefined, (qb) => qb.where('warehouse_id', '=', warehouse_id!))
            .executeTakeFirst();
    }

    async findByEmail(email: string, warehouse_id?: string) {
        return await this.db.selectFrom('storeadmins')
            .selectAll()
            .where('email', '=', email)
            .$if(warehouse_id !== undefined, (qb) => qb.where('warehouse_id', '=', warehouse_id!))
            .executeTakeFirst();
    }

    async findAll(warehouse_id?: string) {
        return await this.db.selectFrom('storeadmins')
            .selectAll()
            .$if(warehouse_id !== undefined, (qb) => qb.where('warehouse_id', '=', warehouse_id!))
            .execute();
    }

    async create(data: CreateStoreAdminParams) {
        const passwordHash = await bcrypt.hash(data.password, 10)
        const insertableData = {
            name: data.name,
            email: data.email,
            password_hash: passwordHash,
            store_id: data.storeId
        }

        return await this.db.insertInto('storeadmins')
            .values(insertableData)
            .returningAll()
            .executeTakeFirst();
    }

    async update(id: string, data: UpdateStoreAdminParams, warehouse_id?: string) {
        const updatableData = { ...data };
        if (data.password) {
            const passwordHash = await bcrypt.hash(data.password, 10)
            updatableData['password_hash'] = passwordHash;
        }

        try {
            return await this.db.updateTable('storeadmins')
                .set(updatableData)
                .where('id', '=', id)
                .$if(warehouse_id !== undefined, (qb) => qb.where('warehouse_id', '=', warehouse_id!))
                .returningAll()
                .executeTakeFirst();
        } catch (error) {
            throw new NotFoundException(error, `Store Admin with ID ${id} not found`);
        }
    }

    async delete(id: string, warehouse_id?: string) {
        try {
            await this.db.deleteFrom('storeadmins')
                .where('id', '=', id)
                .$if(warehouse_id !== undefined, (qb) => qb.where('warehouse_id', '=', warehouse_id!))
                .executeTakeFirst();
        } catch (error) {
            throw new NotFoundException(error, `Store Admin with ID ${id} not found`);
        }
    }
    async findAllByRegion(regionId: string) {
        return await this.db.selectFrom('storeadmins')
            .innerJoin('stores', 'storeadmins.store_id', 'stores.id')
            .innerJoin('warehouses', 'stores.warehouse_id', 'warehouses.id')
            .selectAll('storeadmins')
            .where('warehouses.region_id', '=', regionId)
            .execute();
    }
}