import { DataSource, DataSourceOptions } from "typeorm";
require('dotenv').config()

export let dataSourceOptions
// : DataSourceOptions = {
//     type: 'postgres',
//     host: 'roundhouse.proxy.rlwy.net',
//     username: 'postgres',
//     password: 'Egcb6af-6543C3Cag4CcbfEcAc5fdeE3',
//     database: 'railway',
//     port: 15267,
//     entities: ['dist/**/*.entity.js'],
//     migrations: ['dist/db/migrations/*.js']
// }

console.log(process.env.NODE_ENV)

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


if(process.env.NODE_ENV==="dev")
    dataSourceOptions = {
        type: 'sqlite',
        database: 'db.sqlite',
        entities: ['dist/**/*.entity.js'],
        synchronize: true
    } as DataSourceOptions

const dataSource = new DataSource(dataSourceOptions)
export default dataSource