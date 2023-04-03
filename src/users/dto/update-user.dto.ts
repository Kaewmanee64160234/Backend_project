import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Role } from 'src/types/Role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  role?: Role;
}
