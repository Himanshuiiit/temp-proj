import { User } from '../../users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Version } from './versions.entity';
//   import { User } from './user.entity';

@Entity({ name: 'apps' })
export class App extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.ownedApps, { onDelete: 'CASCADE' })
  @JoinTable()
  owner: User;

  @ManyToMany(() => User, (user) => user.apps)
  @JoinTable()
  users: User[];

  @Column({ nullable: true })
  release: string;

  @OneToMany(() => Version, (version) => version.app, { cascade: ['remove'] })
  versions: Version[];

  // @AfterInsert()
  // update() {
  //   this.updatedAt = new Date()
  // }
}
