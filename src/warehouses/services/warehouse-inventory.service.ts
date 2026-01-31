
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateWarehouseInventoryDto } from "../dtos/update-warehouse-inventory.dto";
import { DATABASE_CONNECTION } from "src/db/db.module";
import { Kysely } from "kysely";
import { DB } from "db/db";

@Injectable()
export class WarehouseInventoryService {
    constructor(@Inject(DATABASE_CONNECTION) private readonly db: Kysely<DB>) { }

    async findAll(warehouseId: string) {
        return await this.db.selectFrom('warehouses_inventories')
            .selectAll()
            .where('warehouse_id', '=', warehouseId)
            .execute();
    }

    async findById(warehouseId: string, productId: string) {
        return await this.db.selectFrom('warehouses_inventories')
            .selectAll()
            .where('warehouse_id', '=', warehouseId)
            .where('product_id', '=', productId)
            .executeTakeFirst();
    }

    async update(warehouseId: string, productId: string, data: UpdateWarehouseInventoryDto) {
        try {
            return await this.db.updateTable('warehouses_inventories')
                .set(data)
                .where('warehouse_id', '=', warehouseId)
                .where('product_id', '=', productId)
                .returningAll()
                .executeTakeFirstOrThrow();
        } catch (error) {
            throw new NotFoundException(`Inventory item not found`);
        }
    }

    async delete(warehouseId: string, productId: string) {
        try {
            await this.db.deleteFrom('warehouses_inventories')
                .where('warehouse_id', '=', warehouseId)
                .where('product_id', '=', productId)
                .executeTakeFirst();
        } catch (error) {
            throw new NotFoundException(`Inventory item not found`);
        }
    }
}
