
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ForbiddenException } from "@nestjs/common";
import { WarehousesService } from "../services/warehouses.service";
import { CreateWarehouseDto } from "../dtos/create-warehouse.dto";
import { UpdateWarehouseDto } from "../dtos/update-warehouse.dto";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { RolesGuard } from "src/auth/guard/roles.guard";
import { AuthorizedRoles } from "src/auth/utils/decorators/roles.decorator";
import { Roles } from "src/auth/utils/enums/roles.enum";
import { Params } from "src/common/utils/params.enum";
import { ResourceGuard } from "src/auth/guard/resource.guard";

@Controller('warehouses')
@UseGuards(AuthGuard, RolesGuard, ResourceGuard)
export class WarehouseController {
    constructor(private readonly warehousesService: WarehousesService) { }

    @Post()
    @AuthorizedRoles(Roles.SITE_ADMIN)
    async create(@Body() body: CreateWarehouseDto) {
        return await this.warehousesService.create(body);
    }

    @Get()
    @AuthorizedRoles(Roles.SITE_ADMIN)
    async findAll() {
        return await this.warehousesService.findAll();
    }

    @Get(`:${Params.WAREHOUSE_ID}`)
    @AuthorizedRoles(Roles.SITE_ADMIN, Roles.WAREHOUSE_ADMIN)
    async findById(@Param(Params.WAREHOUSE_ID) id: string) {
        return await this.warehousesService.findById(id);
    }

    @Patch(`:${Params.WAREHOUSE_ID}`)
    @AuthorizedRoles(Roles.SITE_ADMIN)
    async update(@Param(Params.WAREHOUSE_ID) id: string, @Body() body: UpdateWarehouseDto) {
        return await this.warehousesService.update(id, body);
    }

    @Delete(`:${Params.WAREHOUSE_ID}`)
    @AuthorizedRoles(Roles.SITE_ADMIN)
    async delete(@Param(Params.WAREHOUSE_ID) id: string) {
        return await this.warehousesService.delete(id);
    }
}
