import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './userDto/user.dto';
import { UserService } from './user.service';
import { IUser } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() newUser: UserDto) {
    return this.userService.createUser(newUser);
  }

  @Get()
  async getAllUsers(): Promise<IUser[]> {
    return this.userService.getAllUsers();
  }
}
