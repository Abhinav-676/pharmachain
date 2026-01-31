import { Controller, Get, Patch, Body, Param, Delete, UseGuards, Request, SetMetadata } from "@nestjs/common";
import { StoreInventoryService } from "../services/store-inventory.service";
import { UpdateStoreInventoryDto } from "../dtos/update-store-inventory.dto";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { RolesGuard } from "src/auth/guard/roles.guard";
import { AuthorizedRoles } from "src/auth/utils/decorators/roles.decorator";
import { Roles } from "src/auth/utils/enums/roles.enum";
import { type Request as ExpressReq } from "express";
import { Params } from "src/common/utils/params.enum";
import { ResourceGuard } from "src/auth/guard/resource.guard";

@Controller(`stores/:${Params.STORE_ID}/inventory`)

export class StoreInventoryController {

    constructor(private readonly storeInventoryService: StoreInventoryService) { }

    @Get()
    @AuthorizedRoles(Roles.STORE_ADMIN, Roles.WAREHOUSE_ADMIN, Roles.SITE_ADMIN)
    async findAll(@Param(Params.STORE_ID) storeId: string, @Request() req: ExpressReq) {
        return await this.storeInventoryService.findAll(storeId, req.user?.warehouseId);
    }

    @Get(`:${Params.STORE_PRODUCT_ID}`)
    @AuthorizedRoles(Roles.STORE_ADMIN, Roles.WAREHOUSE_ADMIN, Roles.SITE_ADMIN)
    async findById(@Param(Params.STORE_ID) storeId: string, @Param(Params.STORE_PRODUCT_ID) productId: string) {
        return await this.storeInventoryService.findById(storeId, productId);
    }

    @Patch(`:${Params.STORE_PRODUCT_ID}`)
    @AuthorizedRoles(Roles.STORE_ADMIN)
    async update(@Param(Params.STORE_ID) storeId: string, @Param(Params.STORE_PRODUCT_ID) productId: string, @Body() body: UpdateStoreInventoryDto) {
        return await this.storeInventoryService.update(storeId, productId, body);
    }

    @Delete(`:${Params.STORE_PRODUCT_ID}`)
    @AuthorizedRoles(Roles.STORE_ADMIN)
    async delete(@Param(Params.STORE_ID) storeId: string, @Param(Params.STORE_PRODUCT_ID) productId: string) {
        return await this.storeInventoryService.delete(storeId, productId);
    }
}