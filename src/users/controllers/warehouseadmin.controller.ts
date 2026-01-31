import { Controller, Get, Patch, Post, Delete, Body, Param, UseGuards, Request, ForbiddenException, UnauthorizedException } from "@nestjs/common";
import { CreateWarehouseAdminDto } from "../dtos/create-warehouseadmin.dto";
import { UpdateWarehouseAdminDto } from "../dtos/update-warehouseadmin.dto";
import { WarehouseAdminService } from "../services/warehouseadmin.service";
import { RolesGuard } from "src/auth/guard/roles.guard";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { AuthorizedRoles } from "src/auth/utils/decorators/roles.decorator";
import { Roles } from "src/auth/utils/enums/roles.enum";
import { type Request as ExpressReq } from "express";
import { Params } from "src/common/utils/params.enum";
import { ResourceGuard } from "src/auth/guard/resource.guard";

@Controller('warehouse-admins')

export class WarehouseAdminController {
    constructor(
        private readonly warehouseAdminService: WarehouseAdminService,
    ) { }

    @Post()
    @AuthorizedRoles(Roles.SITE_ADMIN)
    async create(@Body() body: CreateWarehouseAdminDto) {
        return await this.warehouseAdminService.create(body);
    }

    @Get()
    @AuthorizedRoles(Roles.SITE_ADMIN, Roles.WAREHOUSE_ADMIN)
    async findAll(@Request() req: ExpressReq) {
        return await this.warehouseAdminService.findAll(req.user?.warehouseId);
    }

    @Get(`:${Params.USER_ID}`)
    @AuthorizedRoles(Roles.STORE_ADMIN, Roles.WAREHOUSE_ADMIN)
    async findById(@Param(Params.USER_ID) id: string, @Request() req: ExpressReq) {
        return await this.warehouseAdminService.findById(id, req.user?.warehouseId);
    }

    @Patch(`:${Params.USER_ID}`)
    @AuthorizedRoles(Roles.WAREHOUSE_ADMIN)
    async update(@Param(Params.USER_ID) id: string, @Body() body: UpdateWarehouseAdminDto, @Request() req: ExpressReq) {
        return await this.warehouseAdminService.update(id, body, req.user?.warehouseId);
    }

    @Delete(`:${Params.USER_ID}`)
    @AuthorizedRoles(Roles.SITE_ADMIN)
    async delete(@Param(Params.USER_ID) id: string) {
        return await this.warehouseAdminService.delete(id);
    }
}