import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
  async create(fileName: string, createUserDto: CreateUserDto): Promise<void> {
    const { email, firstName, lastName, password, address, contact } = createUserDto;
    const passwordHash = await bcrypt.hash(password, 10);
    try {
      const user = this.userRepository.create({
        email,
        firstName,
        lastName,
        password: passwordHash,
        address,
        contact,
        fileName
      });
      await this.userRepository.save(user);
    } catch(err) {
      this.logger.error(err);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch(err) {

    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      return user;
    } catch(err) {

    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ email });
      return user;
    } catch(err) {

    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const { address, contact } = updateUserDto;
    try {
      await this.userRepository.update(id, { address, contact});
    } catch(err) {
      this.logger.error('')
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch(err) {
      this.logger.error('');
    }
  }
}
