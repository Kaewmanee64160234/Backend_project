import { IsNotEmpty } from 'class-validator';
import { CheckMaterialDetail } from 'src/check_material_detail/entities/check_material_detail.entity';
export class CreateCheckMaterialDto {
  @IsNotEmpty()
  date?: Date;

  @IsNotEmpty()
  time?: Date;

  @IsNotEmpty()
  employeeId: number;

  @IsNotEmpty()
  checkmaterialdetail: CheckMaterialDetail[];
}
