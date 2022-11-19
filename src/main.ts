import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import flash = require('connect-flash');
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '..', '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', '..', 'public'));
  app.setViewEngine('ejs');
  app.use(
    session({
      secret: app.get(ConfigService).get('SECRET'),
      resave: false,
      saveUninitialized: false
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  await app.listen(3000);
}
bootstrap();
