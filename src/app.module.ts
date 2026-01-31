import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { StoresModule } from './stores/stores.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './auth/guard/auth.guard';
import { RolesGuard } from './auth/guard/roles.guard';
import { ResourceGuard } from './auth/guard/resource.guard';
import { RlsInterceptor } from './common/interceptors/rls.interceptor';
import { ClsModule } from 'nestjs-cls';


@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    ConfigModule,
    UsersModule,
    DbModule,
    StoresModule,
    WarehousesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RlsInterceptor,
    },
  ],
  exports: [AppService]
})
export class AppModule { }
