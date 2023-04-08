import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Employee } from 'src/employees/entities/employee.entity';
import { UpdateEmployeeDto } from 'src/employees/dto/update-employee.dto';
import { Role } from 'src/types/Role.enum';
@Injectable()
export class UsersService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
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
    if (createUserDto.role.toLowerCase() === 'owner') {
      user.role = Role.Owner;
    } else {
      user.role = Role.Employee;
    }

    const employee = new Employee();
    employee.email = createUserDto.login;
    employee.name = createUserDto.name_employee;
    employee.address = createUserDto.address;
    employee.image = createUserDto.image;
    employee.tel = createUserDto.tel;
    employee.position = createUserDto.position;
    employee.hourly = createUserDto.hourly;
    employee.image = createUserDto.image;
    employee.salary = createUserDto.salary;
    employee.fullTime = createUserDto.fullTime;
    const emp = await this.employeesRepository.save(employee);
    user.employee = emp;
    return await this.usersRepository.save(user);
  }

  async findAll(query) {
    const page = query.page || 1;
    const take = query.take || 10;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';
    const orderBy = query.orderBy || 'username';
    const order = query.order || 'ASC';
    const currentPage = page;

    const [result, total] = await this.usersRepository.findAndCount({
      where: { username: Like(`%${keyword}%`) },
      order: { [orderBy]: order },
      relations: ['employee'],
      take: take,
      skip: skip,
    });
    const lastPage = Math.ceil(total / take);
    return {
      data: result,
      count: total,
      currentPage: currentPage,
      lastPage: lastPage,
    };
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
      let user = new User();
      user = await this.usersRepository.findOne({
        where: { id: id },
        relations: ['employee'],
      });
      if (updateUserDto.role.toLowerCase() === 'owner') {
        updateUserDto.role = Role.Owner;
      } else {
        updateUserDto.role = Role.Employee;
      }
      updateUserDto.password = user.password;
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
        relations: ['employee', 'employee.check_in_outs'],
      });
      if (user) {
        return user;
      } else {
        throw new NotFoundException();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException();
    }
    return this.usersRepository.softRemove(user);
  }

  findUserByName(name: string) {
    try {
      const user = this.usersRepository.findOne({
        where: { username: name },
        relations: ['employee'],
        order: { username: 'ASC' },
      });
      return user;
    } catch (e) {
      console.log(e);
    }
  }
  async confirmWithPassword(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { login: createUserDto.login },
    });
    const isMatch = await bcrypt.compare(createUserDto.password, user.password);
    if (isMatch) {
      return {
        status: true,
      };
    } else {
      throw new NotFoundException('Your password is not matches');
    }
  }
}
