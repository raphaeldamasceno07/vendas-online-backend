import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './userDto/user.dto';
import { UserEntity } from './userEntity/user.entity';
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
    const emailExists = await this.userRepository.findOne({
      where: {
        email: createUser.email,
      },
    });

    const cpfExists = await this.userRepository.findOne({
      where: {
        cpf: createUser.cpf,
      },
    });

    if (emailExists) {
      throw new ConflictException('email already in use');
    }

    if (cpfExists) {
      throw new ConflictException('cpf already in use');
    }

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

  async findById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });
  }
}
