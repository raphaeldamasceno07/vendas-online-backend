import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateEntity } from './stateEntity/state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
  ) {}

  async getAllState(): Promise<StateEntity[]> {
    return this.stateRepository.find();
  }

  async findStateById(id: number) {
    return await this.stateRepository.findOne({
      where: { id },
      relations: ['cities'],
    });
  }
}
