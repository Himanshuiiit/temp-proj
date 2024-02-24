import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { Component } from './component.entity';

@Entity({ name: 'layouts' })
export class Layout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'app_id' })
  appId: string;

  // @Column()
  // type: string;

  @Column({ type: 'double precision' })
  top: number;

  @Column({ type: 'double precision' })
  left: number;

  @Column({ type: 'double precision' })
  width: number;

  @Column({ type: 'double precision' })
  height: number;

  // @Column({ name: 'component_id' })
  // componentId: string;

  @OneToOne(() => Component, (component) => component.layouts, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'component_id' })
  component: Component;
}
