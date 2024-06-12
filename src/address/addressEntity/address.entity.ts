import { CityEntity } from 'src/city/cityEntity/city.entity';
import { UserEntity } from 'src/user/userEntity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({ name: 'city_id', nullable: false })
  cityId: number;

  @Column({ name: 'complement', nullable: true })
  complement: string;

  @Column({ name: 'number_address', nullable: false })
  numberAddress: string;

  @Column({ name: 'cep', nullable: false })
  cep: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;

  @ManyToOne(() => CityEntity, (city) => city.addresses)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city?: CityEntity;
}
