
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateStoreDto } from "../dtos/create-store.dto";
import { UpdateStoreDto } from "../dtos/update-store.dto";
import { DATABASE_CONNECTION } from "src/db/db.module";
import { Kysely } from "kysely";
import { DB } from "db/db";

@Injectable()
export class StoresService {
    constructor(@Inject(DATABASE_CONNECTION) private readonly db: Kysely<DB>) { }

    async create(data: CreateStoreDto) {
        return await this.db.insertInto('stores')
            .values(data)
            .returningAll()
            .executeTakeFirst();
    }

    async findAll(warehouse_id?: string) {
        return await this.db.selectFrom('stores')
            .$if(warehouse_id !== undefined, (qb) => qb.where('warehouse_id', '=', warehouse_id!))
            .selectAll()
            .execute();
    }

    async findById(storeId: string, warehouse_id?: string) {
        return await this.db.selectFrom('stores')
            .selectAll()
            .where('id', '=', storeId)
            .$if(warehouse_id !== undefined, (qb) => qb.where('warehouse_id', '=', warehouse_id!))
            .executeTakeFirst();
    }

    async update(storeId: string, data: UpdateStoreDto, warehouse_id?: string) {
        try {
            return await this.db.updateTable('stores')
                .set(data)
                .where('id', '=', storeId)
                .$if(warehouse_id !== undefined, (qb) => qb.where('warehouse_id', '=', warehouse_id!))
                .returningAll()
                .executeTakeFirstOrThrow();
        } catch (error) {
            throw new NotFoundException(`Store with ID ${storeId} not found`);
        }
    }

    async delete(storeId: string, warehouse_id?: string) {
        try {
            await this.db.deleteFrom('stores')
                .where('id', '=', storeId)
                .$if(warehouse_id !== undefined, (qb) => qb.where('warehouse_id', '=', warehouse_id!))
                .executeTakeFirst();
        } catch (error) {
            throw new NotFoundException(`Store with ID ${storeId} not found`);
        }
    }
    async getRegionId(id: string) {
        const result = await this.db.selectFrom('stores')
            .innerJoin('warehouses', 'stores.warehouse_id', 'warehouses.id')
            .select('warehouses.region_id')
            .where('stores.id', '=', id)
            .executeTakeFirst();

        return result?.region_id;
    }
}
