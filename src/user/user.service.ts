import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './userDto/user.dto';
import { IUser } from './interfaces/user.interface';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  private users: IUser[] = [];

  async createUser(createUser: UserDto): Promise<IUser> {
    const foundUser = this.users.find((u) => u.email === createUser.email);

    if (foundUser) {
      throw new ConflictException('User already exists');
    }

    const saltOrRounds = 10;
    const passwordhashed = await hash(createUser.password, saltOrRounds);

    const newUser: IUser = {
      ...createUser,
      id: this.users.length + 1,
      password: passwordhashed,
    };

    this.users.push(newUser);

    return newUser;
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.users;
  }
}
