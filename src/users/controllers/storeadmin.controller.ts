
import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from "@nestjs/common";
import { CreateStoreAdminDto } from "../dtos/create-storeadmin.dto";
import { StoreAdminService } from "../services/storeadmin.service";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { RolesGuard } from "src/auth/guard/roles.guard";
import { AuthorizedRoles } from "src/auth/utils/decorators/roles.decorator";
import { Roles } from "src/auth/utils/enums/roles.enum";
import { type Request as ExpressReq } from "express";
import { Params } from "src/common/utils/params.enum";
import { ResourceGuard } from "src/auth/guard/resource.guard";


@Controller('store-admins')
@UseGuards(AuthGuard, RolesGuard, ResourceGuard)
export class StoreAdminController {
    constructor(
        private readonly storeAdminService: StoreAdminService
    ) { }

    @Post()
    @AuthorizedRoles(Roles.SITE_ADMIN, Roles.WAREHOUSE_ADMIN)
    async create(@Body() body: CreateStoreAdminDto) {
        return await this.storeAdminService.create(body);
    }

    @Get()
    @AuthorizedRoles(Roles.SITE_ADMIN, Roles.WAREHOUSE_ADMIN)
    async findAll(@Request() req: ExpressReq) {
        return await this.storeAdminService.findAll(req.user?.warehouseId);
    }

    @Get(`:${Params.USER_ID}`)
    @AuthorizedRoles(Roles.SITE_ADMIN, Roles.WAREHOUSE_ADMIN)
    async findById(@Param(Params.USER_ID) id: string, @Request() req: ExpressReq) {
        return await this.storeAdminService.findById(id, req.user?.warehouseId);
    }

    @Delete(`:${Params.USER_ID}`)
    @AuthorizedRoles(Roles.SITE_ADMIN, Roles.WAREHOUSE_ADMIN)
    async delete(@Param(Params.USER_ID) id: string, @Request() req: ExpressReq) {
        return await this.storeAdminService.delete(id, req.user?.warehouseId);
    }
}