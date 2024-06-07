import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './userDto/user.dto';

@Controller('user')
export class UserController {
  @Post()
  async createUser(@Body() newUser: UserDto) {
    console.log(newUser);

    return {
      ...newUser,
      password: undefined,
    };
  }
}
