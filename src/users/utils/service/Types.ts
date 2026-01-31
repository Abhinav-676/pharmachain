import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateStoreAdminDto } from "../../dtos/create-storeadmin.dto";
import { CreateWarehouseAdminDto } from "../../dtos/create-warehouseadmin.dto";
import { UpdateSiteAdminDto } from "../../dtos/update-siteadmin.dto";
import { UpdateWarehouseAdminDto } from "../../dtos/update-warehouseadmin.dto";


export class CreateStoreAdminParams {
    name: string;
    email: string;
    password: string;
    storeId: string;
}

export class CreateWarehouseAdminParams {
    name: string;
    email: string;
    password: string;
    warehouseId: string;
}

export class UpdateStoreAdminParams extends PartialType(CreateStoreAdminParams) { }
export class UpdateWarehouseAdminParams extends PartialType(CreateWarehouseAdminParams) { }
export class UpdateSiteAdminParams {
    name?: string;
    email?: string;
    password?: string;
}

export class CreateSiteAdminParams {
    name: string;
    email: string;
    password: string;
}