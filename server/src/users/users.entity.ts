import { App } from '../apps/entities/app.entity';
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => App, (app) => app.owner, { cascade: ['remove'] })
  ownedApps: App[];

  @ManyToMany(() => App, (app) => app.users)
  apps: App[];
}
