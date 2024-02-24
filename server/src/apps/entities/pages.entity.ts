import { Version } from './versions.entity';
import { Component } from '../../components/entities/component.entity';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pages' })
export class Page extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  route: string;

  @Column({ name: 'app_id' })
  appId: string;

  @ManyToOne(() => Version, (version) => version.pages, { onDelete: 'CASCADE', eager: true })
  version: Version;

  @OneToMany(() => Component, (component) => component.page, { cascade: ['remove'] })
  components: Component[];
}
