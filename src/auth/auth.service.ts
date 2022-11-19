import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
private logger = new Logger(AuthService.name);
  async register(fileName: string, createUserDto: CreateUserDto): Promise<void> {
    try {
      await this.usersService.create(fileName, createUserDto);
    } catch(err) {
      this.logger.error('');
    }
  }

  async validate(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { email, password } = authCredentialsDto;
    try {
      const user = await this.usersService.findOneByEmail(email);
      const passwordMatch = await bcrypt.compare(password, user.password);
      if(user && passwordMatch) {
        return user;
      }
      return null;
    } catch(err) {
      this.logger.error('');
    }
  }
}
