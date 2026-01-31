import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Roles } from "../utils/enums/roles.enum";
import { Params } from "src/common/utils/params.enum";

@Injectable()
export class ResourceGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const params = request.params;
        const user = request.user;

        if (user?.role == Roles.STORE_ADMIN) {
            if (params[Params.STORE_ID] && params[Params.STORE_ID] != user.storeId) {
                return false;
            }
        }

        if (user?.role == Roles.WAREHOUSE_ADMIN) {
            if (params[Params.WAREHOUSE_ID] && params[Params.WAREHOUSE_ID] != user.warehouseId) {
                return false;
            }
        }

        return true;
    }
}