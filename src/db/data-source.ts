import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from '../user/userEntity/user.entity';
import { AddressEntity } from 'src/address/addressEntity/address.entity';
import { CityEntity } from 'src/city/cityEntity/city.entity';
import { StateEntity } from 'src/state/stateEntity/state.entity';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [UserEntity, AddressEntity, CityEntity, StateEntity],
  migrations: [__dirname + '/migrations/*.js'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
