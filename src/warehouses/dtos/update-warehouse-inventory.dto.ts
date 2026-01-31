
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class UpdateWarehouseInventoryDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    quantity: number;
}
