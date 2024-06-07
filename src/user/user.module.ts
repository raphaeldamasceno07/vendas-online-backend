import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.provider';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}