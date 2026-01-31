
import { Controller, Get, Patch, Body, Param, Delete, UseGuards } from "@nestjs/common";
import { WarehouseInventoryService } from "../services/warehouse-inventory.service";
import { UpdateWarehouseInventoryDto } from "../dtos/update-warehouse-inventory.dto";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { RolesGuard } from "src/auth/guard/roles.guard";
import { AuthorizedRoles } from "src/auth/utils/decorators/roles.decorator";
import { Roles } from "src/auth/utils/enums/roles.enum";
import { Params } from "src/common/utils/params.enum";
import { ResourceGuard } from "src/auth/guard/resource.guard";

@Controller(`warehouses/:${Params.WAREHOUSE_ID}/inventory`)
@UseGuards(AuthGuard, RolesGuard, ResourceGuard)
export class WarehouseInventoryController {

    constructor(private readonly warehouseInventoryService: WarehouseInventoryService) { }

    @Get()
    @AuthorizedRoles(Roles.SITE_ADMIN, Roles.WAREHOUSE_ADMIN)
    async findAll(@Param(Params.WAREHOUSE_ID) warehouseId: string) {
        return await this.warehouseInventoryService.findAll(warehouseId);
    }

    @Get(`:${Params.WAREHOUSE_PRODUCT_ID}`)
    @AuthorizedRoles(Roles.SITE_ADMIN, Roles.WAREHOUSE_ADMIN)
    async findById(@Param(Params.WAREHOUSE_ID) warehouseId: string, @Param(Params.WAREHOUSE_PRODUCT_ID) productId: string) {
        return await this.warehouseInventoryService.findById(warehouseId, productId);
    }

    @Patch(`:${Params.WAREHOUSE_PRODUCT_ID}`)
    @AuthorizedRoles(Roles.WAREHOUSE_ADMIN)
    async update(@Param(Params.WAREHOUSE_ID) warehouseId: string, @Param(Params.WAREHOUSE_PRODUCT_ID) productId: string, @Body() body: UpdateWarehouseInventoryDto) {
        return await this.warehouseInventoryService.update(warehouseId, productId, body);
    }

    @Delete(`:${Params.WAREHOUSE_PRODUCT_ID}`)
    @AuthorizedRoles(Roles.WAREHOUSE_ADMIN)
    async delete(@Param(Params.WAREHOUSE_ID) warehouseId: string, @Param(Params.WAREHOUSE_PRODUCT_ID) productId: string) {
        return await this.warehouseInventoryService.delete(warehouseId, productId);
    }
}
