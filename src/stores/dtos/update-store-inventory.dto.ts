
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class UpdateStoreInventoryDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    quantity: number;
}
