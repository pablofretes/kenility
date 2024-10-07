import { Module } from '@nestjs/common';
import { UserModule } from './users/infrastructure/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
