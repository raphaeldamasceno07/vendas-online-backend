import { Controller, Get, Param } from '@nestjs/common';
import { StateService } from './state.service';
import { StateEntity } from './stateEntity/state.entity';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async getAllState(): Promise<StateEntity[]> {
    return this.stateService.getAllState();
  }

  @Get('/:id')
  async findStateById(@Param('id') id: number): Promise<StateEntity> {
    return await this.stateService.findStateById(id);
  }
}
