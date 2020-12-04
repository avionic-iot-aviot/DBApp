import { ITenant } from '../interfaces/interfaces';
import { stat } from 'fs';
const _ = require('lodash');
//const moment = require('moment');
const config = require('../../../backend/knexfile');
const knex = require('knex')(config[process.env.NODE_ENV]);


// var knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host : '172.18.0.2',
//     user : 'melo',
//     password : 'melo',
//     database : 'test'
//   }
// });


export default class TenantStore {
    constructor() { }

    create(tenant: ITenant) {
        return knex('Tenant')
            .insert(tenant);
    }

    // update(tenant: ITenant) {
    //     //const date = new Date(moment().format()).toISOString();
    //     //tenant.updated_at = date;
    //     //return knex('Tenant').where({ id: tenant.id }).update(tenant);
    // }

    // delete(id: number) {
    //     return knex('Tenant').where({ id }).del();
    // }

    async findById(id: number) {
        return await knex('Tenant')
            .where({
                Tenant_id: id
            })
            .select('*')
    }

    // findBy(tenant: ITenant): any {
    //     return knex('Tenant').where(tenant);
    // }

    // findAll() {
    //     return knex('Tenant').returning('*');
    // }

    // getAll(options: ISearchOpt) {
    //     return knex.raw(`SELECT *
    //         FROM Tenant
    //         WHERE description LIKE '%${options.needle}%'
    //         OR edge_interface_name LIKE '%${options.needle}%'
    //         ORDER BY created_at DESC
    //         LIMIT ${options.itemsPerPage}
    //         OFFSET ${(options.itemsPerPage * (options.activePage - 1))}`          
    // //         )
    //         .then((data: any) => {
    //         return data;
    //     }).catch((err: any) => {
    //         return err;
    //     });
    // }

    /////////////////////////////// --------------------------------- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    async TenantExists(id: number) {
        let status = await this.findById(id)
        if( status.length === 1 ){
            return 1
        }
        else {
            return 0
        }
        
    }

}