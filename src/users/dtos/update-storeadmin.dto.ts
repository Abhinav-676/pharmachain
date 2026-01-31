import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateStoreAdminDto } from "./create-storeadmin.dto";


export class UpdateStoreAdminDto extends OmitType(PartialType(CreateStoreAdminDto), ['confirmPassword']) {}