import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './userDto/user.dto';
import { UserEntity } from '../db/entities/user.entity';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUser: UserDto): Promise<UserEntity> {
    const saltOrRounds = 10;
    const passwordhashed = await hash(createUser.password, saltOrRounds);

    return await this.userRepository.save({
      ...createUser,
      password: passwordhashed,
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
