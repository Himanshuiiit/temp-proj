import { DataSource, DataSourceOptions } from "typeorm";
require('dotenv').config()

export let dataSourceOptions

if(process.env.NODE_ENV==="production")
    dataSourceOptions = {
        type: 'postgres',
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: parseInt(process.env.DB_PORT),
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/db/migrations/*.js']
    } as DataSourceOptions


else if(process.env.NODE_ENV==="dev")
    dataSourceOptions = {
        type: 'postgres',
        host: process.env.DEV_DB_HOST,
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_DATABASE,
        port: parseInt(process.env.DEV_DB_PORT),
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/db/migrations/*.js'],
        synchronize: true
        
    } as DataSourceOptions

else if(process.env.NODE_ENV==="test")
    dataSourceOptions = {
        type: 'sqlite',
        database: 'test.sqlite',
        entities: ['**/*.entity.ts'],
        synchronize: true
    } as DataSourceOptions

const dataSource = new DataSource(dataSourceOptions)
export default dataSource