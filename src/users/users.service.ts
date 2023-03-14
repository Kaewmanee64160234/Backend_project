import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Employee } from 'src/employees/entities/employee.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hash;
    const user = new User();

    user.login = createUserDto.login;
    user.password = hash;
    user.username = createUserDto.username;
    user.role = createUserDto.role;
    const user_ = await this.usersRepository.save(user);
    const employee = new Employee();
    employee.name = createUserDto.username;
    employee.email = createUserDto.login;
    employee.hourly = 0;
    employee.address = createUserDto.addressEmployee;
    employee.tel = createUserDto.telEmployee;
    employee.position = createUserDto.position;
    const emp_ = await this.employeeRepository.save(employee);

    user_.employee = emp_;
    // employee.user = user;
    await this.employeeRepository.save(employee);
    return await this.usersRepository.save(user_);
  }

  findAll() {
    return this.usersRepository.find({ relations: ['employee'] });
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: { id: id },
      relations: ['employee'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.password !== undefined) {
        const salt = await bcrypt.genSalt();

        const hash = await bcrypt.hash(updateUserDto.password, salt);
        updateUserDto.password = hash;
      }
      const updatedUser = await this.usersRepository.save({
        id,
        ...updateUserDto,
      });
      return updatedUser;
    } catch (e) {
      throw new NotFoundException();
    }
  }
  async findOneByEmail(name: string) {
    try {
      const user = await this.usersRepository.findOne({
        relations: ['employee'],
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
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return this.usersRepository.softRemove(user);
  }
}
