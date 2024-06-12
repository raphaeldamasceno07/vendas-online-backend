import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDto } from './userDto/user.dto';
import { UserService } from './user.service';
import { UserEntity } from './userEntity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() newUser: UserDto) {
    return this.userService.createUser(newUser);
  }

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }
}
