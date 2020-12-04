import { IDevice } from '../interfaces/interfaces';
const _ = require('lodash');
// const moment = require('moment');
var config = require('../../../backend/knexfile');
var knex = require('knex')(config[process.env.NODE_ENV]);


export default class DeviceStore {
    constructor() { }

    //     create(device: IDevice) {
    //         return knex('devices').insert(device).returning('*');
    //     }

    //     update(device: IDevice) {
    //         const date = new Date(moment().format()).toISOString();
    //         device.updated_at = date;
    //         return knex('devices').where({ id: device.id }).update(device).returning('*');
    //     }

    //     delete(id: number) {
    //         return knex('devices').where({ id }).del();
    //     }

    //     findById(id: number): any {
    //         return knex('devices').select('*').where({ id });
    //     }

    async getAllElements() {
        return await knex('Devices')
            .select('*')
    }

    async findByMac(mac: string) {
        return await knex('Devices')
            .where({
                Mac: mac
            })
            .select('*')
    }

    async create(device: IDevice) {
        return await knex('Devices').insert(device)
    }

    // async findByMacAndIp(mac: string, ip: string) {
    //     return await knex('Devices')
    //         .where({
    //             Mac: mac
    //         })
    //         .where({
    //             Ip: ip
    //         })
    //         .select('*')
    // }

    async update(mac: string, hostName: string) {
        return await knex('Devices')
            .where({ Mac: mac
            })
            .update({Current_Name: hostName})
    }

    //     findBy(device: IDevice): any {
    //         return knex('devices').where(device).returning('*');
    //     }

    //     findAll() {
    //         return knex('devices').returning('*');
    //     }

    //     getAll(options: ISearchOpt) {
    //         return knex.raw(`SELECT *
    //             FROM devices
    //             WHERE mac_address LIKE '%${options.needle}%'
    //             OR dns_name_auto LIKE '%${options.needle}%'
    //             OR dns_name_manual LIKE '%${options.needle}%'
    //             ORDER BY created_at DESC
    //             LIMIT ${options.itemsPerPage}
    //             OFFSET ${(options.itemsPerPage * (options.activePage - 1))}`
    //         )
    //             .then((data: any) => {
    //                 return data;
    //             }).catch((err: any) => {
    //                 return err;
    //             });
    //     }
}