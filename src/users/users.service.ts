import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Employee } from 'src/employees/entities/employee.entity';
import { UpdateEmployeeDto } from 'src/employees/dto/update-employee.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new User();
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hash;
    user.password = hash;
    user.username = createUserDto.username;
    user.login = createUserDto.login;
    user.role = createUserDto.role;

    const employee = new Employee();
    employee.email = createUserDto.login;
    employee.name = createUserDto.name_employee;
    employee.address = createUserDto.address;
    employee.image = createUserDto.image;
    employee.tel = createUserDto.tel;
    employee.position = createUserDto.position;
    employee.hourly = createUserDto.hourly;
    employee.image = createUserDto.image;
    const emp = await this.employeesRepository.save(employee);
    user.employee = emp;
    return await this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find({ relations: ['employee'] });
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.password !== undefined) {
        const salt = await bcrypt.genSalt();

        const hash = await bcrypt.hash(updateUserDto.password, salt);
        updateUserDto.password = hash;
      }
      const user = await this.usersRepository.findOne({
        where: { id: id },
        relations: ['employee'],
      });
      const updatedUser = {
        ...user,
        ...updateUserDto,
            };

      return await this.usersRepository.save(updatedUser);
    } catch (e) {
      throw new NotFoundException();
    }
  }
  async findOneByEmail(name: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { login: name },
      });
      if (user) {
        // const salt = await bcrypt.genSalt();
        // user.password = await bcrypt.hash(user.password, salt);
        return user;
      } else {
        throw new NotFoundException();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id:id });
    if (!user) {
      throw new NotFoundException();
    }
    return this.usersRepository.softRemove(user);
  }
}
