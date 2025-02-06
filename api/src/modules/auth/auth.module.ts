import { Module } from '@nestjs/common';
import { MongoModule } from 'src/common/modules/mongo.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import config from 'src/configs/config';
import {JwtStrategy} from "./services/jwt.strategy";
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongoModule,
    JwtModule.register({
      secret: config().jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
