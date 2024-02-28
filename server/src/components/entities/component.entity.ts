import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToOne } from 'typeorm';
//   import { Page } from './page.entity';
import { Layout } from './layout.entity';
import { Page } from '../../apps/entities/pages.entity';

@Entity({ name: 'components' })
//   @Index('idx_component_page_id', ['pageId'])
export class Component {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ name: 'app_id' })
  appId: string;

  @Column({ name: 'page_id' })
  pageId: string;

  @Column({ nullable: true })
  parent: string;

  @Column('simple-json', {
    nullable: true,
  })
  properties: object;

  // @Column('simple-json', { name: 'general_properties', nullable: true })
  // general: any;

  @Column('simple-json')
  styles: any;

  // @Column('simple-json', { name: 'general_styles', nullable: true })
  // generalStyles: any;

  // @Column('simple-json', { name: 'display_preferences', nullable: true })
  // displayPreferences: any;

  // @Column('simple-json')
  // validation: any;

  @ManyToOne(() => Page, (page) => page.components, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'page_id' })
  page: Page;

  @OneToOne(() => Layout, (layout) => layout.component, { cascade: ['remove'] })
  layouts: Layout;
}
