import { Controller, Get, Patch, Body, Param, UseGuards, Request } from "@nestjs/common";
import { UpdateSiteAdminDto } from "../dtos/update-siteadmin.dto";
import { SiteAdminService } from "../services/siteadmin.service";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/auth/guard/roles.guard";
import { AuthorizedRoles } from "src/auth/utils/decorators/roles.decorator";
import { Roles } from "src/auth/utils/enums/roles.enum";
import { Params } from "src/common/utils/params.enum";
import { ResourceGuard } from "src/auth/guard/resource.guard";


@Controller('site-admins')
@AuthorizedRoles(Roles.SITE_ADMIN)
@UseGuards(AuthGuard, RolesGuard, ResourceGuard)
export class SiteAdminController {
    constructor(
        private readonly siteAdminService: SiteAdminService,
    ) { }

    @Get()
    async findAll() {
        return await this.siteAdminService.findAll();
    }

    @Get(`:${Params.USER_ID}`)
    async findById(@Param(Params.USER_ID) id: string) {
        return await this.siteAdminService.findById(id);
    }

    @Patch(`:${Params.USER_ID}`)
    async update(@Param(Params.USER_ID) id: string, @Body() body: UpdateSiteAdminDto) {
        return await this.siteAdminService.update(id, body);
    }
}