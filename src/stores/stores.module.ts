import { Module } from '@nestjs/common';
import { StoreController } from './controllers/store.controller';
import { StoreInventoryController } from './controllers/store-inventory.controller';
import { StoresService } from './services/stores.service';
import { StoreInventoryService } from './services/store-inventory.service';
import { DbModule } from 'src/db/db.module';

@Module({
    imports: [DbModule],
    controllers: [StoreController, StoreInventoryController],
    providers: [StoresService, StoreInventoryService],
    exports: [StoresService]
})
export class StoresModule { }
