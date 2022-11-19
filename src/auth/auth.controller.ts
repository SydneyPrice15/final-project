import { Controller, Get, Post, Body, Res, UseGuards, Render, UseInterceptors, UploadedFile, Logger, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImage } from '../../helpers/image-upload';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginGuard } from './guards/login.guard';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Get('register')
  @Render('auth/register')
  getRegisterPage() {
    const title = 'Register';
    return { title };
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('image', saveImage))
  async register(@UploadedFile() file: Express.Multer.File, @Body() createUserDto: CreateUserDto) {
    this.logger.debug(file, createUserDto)
    const fileName = file.filename;
    return await this.authService.register(fileName, createUserDto);
  }

  @Get('login')
  @Render('auth/login')
  getLoginPage(){
    const title = 'Login';
    return { title };
  }

  @Post('login')
  @UseGuards(LoginGuard)
  async login(@Req() req, @Res() res) {
    this.logger.debug(req.user)
    return res.redirect('/');
  }
}
