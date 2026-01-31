import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { StoresModule } from './stores/stores.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';


@Module({
  imports: [ConfigModule,UsersModule, DbModule, StoresModule, WarehousesModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService
  ],
  exports: [AppService]
})
export class AppModule { }
