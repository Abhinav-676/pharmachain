import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { ResourceGuard } from './guard/resource.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getEnvVariable(configService.ENV.JWT_SECRET),
        signOptions: { expiresIn: '1h' }
      })
    }),
    UsersModule
  ],
  providers: [AuthService, AuthGuard, RolesGuard, ResourceGuard],
  controllers: [AuthController],
  exports: [AuthGuard, RolesGuard, ResourceGuard]
})
export class AuthModule { }
