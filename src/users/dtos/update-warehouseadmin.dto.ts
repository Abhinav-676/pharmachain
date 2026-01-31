import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateWarehouseAdminDto } from "./create-warehouseadmin.dto";


export class UpdateWarehouseAdminDto extends OmitType(PartialType(CreateWarehouseAdminDto), ['confirmPassword']) {}