
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateStoreInventoryDto } from "../dtos/update-store-inventory.dto";
import { DATABASE_CONNECTION } from "src/db/db.module";
import { Kysely } from "kysely";
import { DB } from "db/db";

@Injectable()
export class StoreInventoryService {
    constructor(@Inject(DATABASE_CONNECTION) private readonly db: Kysely<DB>) { }

    async findAll(storeId: string, warehouse_id?: string) {
        return await this.db.selectFrom('stores_inventories')
            .selectAll()
            .where('store_id', '=', storeId)
            .$if(warehouse_id !== undefined, (qb) => qb.where('warehouse_id', '=', warehouse_id!))
            .execute();
    }

    async findById(storeId: string, productId: string, warehouse_id?: string) {
        return await this.db.selectFrom('stores_inventories')
            .selectAll()
            .where('store_id', '=', storeId)
            .where('product_id', '=', productId)
            .$if(warehouse_id !== undefined, (qb) => qb.where('warehouse_id', '=', warehouse_id!))
            .executeTakeFirst();
    }

    async update(storeId: string, productId: string, data: UpdateStoreInventoryDto, warehouse_id?: string) {
        try {
            return await this.db.updateTable('stores_inventories')
                .set(data)
                .where('store_id', '=', storeId)
                .where('product_id', '=', productId)
                .$if(warehouse_id !== undefined, (qb) => qb.where('warehouse_id', '=', warehouse_id!))
                .returningAll()
                .executeTakeFirstOrThrow();
        } catch (error) {
            throw new NotFoundException(`Inventory item not found`);
        }
    }

    async delete(storeId: string, productId: string, warehouse_id?: string) {
        try {
            await this.db.deleteFrom('stores_inventories')
                .where('store_id', '=', storeId)
                .where('product_id', '=', productId)
                .$if(warehouse_id !== undefined, (qb) => qb.where('warehouse_id', '=', warehouse_id!))
                .executeTakeFirst();
        } catch (error) {
            throw new NotFoundException(`Inventory item not found`);
        }
    }
}
