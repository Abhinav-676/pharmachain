import { Module } from '@nestjs/common';
import { SiteAdminService } from './services/siteadmin.service';
import { StoreAdminService } from './services/storeadmin.service';
import { WarehouseAdminService } from './services/warehouseadmin.service';
import { DbModule } from 'src/db/db.module';
import { StoresModule } from 'src/stores/stores.module';

@Module({
    imports: [DbModule, StoresModule],
    providers: [SiteAdminService, StoreAdminService, WarehouseAdminService],
    exports: [SiteAdminService, StoreAdminService, WarehouseAdminService]
})
export class UsersModule { }
