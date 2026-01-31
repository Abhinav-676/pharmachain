import { Module } from '@nestjs/common';
import { WarehouseController } from './controllers/warehouse.controller';
import { WarehouseInventoryController } from './controllers/warehouse-inventory.controller';
import { WarehousesService } from './services/warehouses.service';
import { WarehouseInventoryService } from './services/warehouse-inventory.service';
import { DbModule } from 'src/db/db.module';

@Module({
    imports: [DbModule],
    controllers: [WarehouseController, WarehouseInventoryController],
    providers: [WarehousesService, WarehouseInventoryService],
})
export class WarehousesModule { }
