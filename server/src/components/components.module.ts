import { Module, forwardRef } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { ComponentsController } from './components.controller';
import { AppComponentGuard } from './guards/app-component.guard';
import { Component } from './entities/component.entity';
import { Layout } from './entities/layout.entity';
import { Version } from 'src/apps/entities/versions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppsModule } from 'src/apps/apps.module';

@Module({
  imports: [TypeOrmModule.forFeature([Component, Layout, Version]), forwardRef(() => AppsModule)],
  controllers: [ComponentsController],
  providers: [ComponentsService, AppComponentGuard],
  exports: [ComponentsService],
})
export class ComponentsModule {}
