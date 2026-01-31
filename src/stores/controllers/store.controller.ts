import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from "@nestjs/common";
import { StoresService } from "../services/stores.service";
import { CreateStoreDto } from "../dtos/create-store.dto";
import { UpdateStoreDto } from "../dtos/update-store.dto";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { RolesGuard } from "src/auth/guard/roles.guard";
import { AuthorizedRoles } from "src/auth/utils/decorators/roles.decorator";
import { Roles } from "src/auth/utils/enums/roles.enum";
import { type Request as ExpressReq } from "express";
import { Params } from "src/common/utils/params.enum";
import { ResourceGuard } from "src/auth/guard/resource.guard";

@Controller('stores')
@UseGuards(AuthGuard, RolesGuard, ResourceGuard)
export class StoreController {
    constructor(private readonly storesService: StoresService) { }

    @Post()
    @AuthorizedRoles(Roles.SITE_ADMIN, Roles.WAREHOUSE_ADMIN)
    async create(@Body() body: CreateStoreDto) {
        return await this.storesService.create(body);
    }

    @Get()
    @AuthorizedRoles(Roles.SITE_ADMIN, Roles.WAREHOUSE_ADMIN)
    async findAll(@Request() req: ExpressReq) {
        return await this.storesService.findAll(req.user?.warehouseId!);
    }

    @Get(`:${Params.STORE_ID}`)
    @AuthorizedRoles(Roles.SITE_ADMIN, Roles.WAREHOUSE_ADMIN, Roles.STORE_ADMIN)
    async findById(@Param(Params.STORE_ID) id: string, @Request() req: ExpressReq) {
        return await this.storesService.findById(id, req.user?.warehouseId);
    }

    @Patch(`:${Params.STORE_ID}`)
    @AuthorizedRoles(Roles.SITE_ADMIN, Roles.WAREHOUSE_ADMIN)
    async update(@Param(Params.STORE_ID) id: string, @Body() body: UpdateStoreDto, @Request() req: ExpressReq) {
        return await this.storesService.update(id, body, req.user?.warehouseId);
    }

    @Delete(`:${Params.STORE_ID}`)
    @AuthorizedRoles(Roles.SITE_ADMIN, Roles.WAREHOUSE_ADMIN)
    async delete(@Param(Params.STORE_ID) id: string) {
        return await this.storesService.delete(id);
    }
}