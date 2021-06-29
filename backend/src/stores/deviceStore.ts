import { IDevice, ILeases } from '../interfaces/interfaces';
const _ = require('lodash');
// const moment = require('moment');
var config = require('../../../backend/knexfile');
var knex = require('knex')(config[process.env.NODE_ENV]);


export default class DeviceStore {
    constructor() { }

    create(device: IDevice) {
        return knex('devices').insert(device).returning('*');
    }

    update(mac_address: string, current_name: string) {
        return knex('devices').where({ mac_address }).update({ current_name });
    }

    updateIP(mac_address: string, ip: string) {
        return knex('devices').where({ mac_address }).update({ ip, is_active: true });
    }

    updateDevice(lease: ILeases) {
        return knex('devices').where({ mac_address: lease.mac }).update({ ip: lease.ip, is_drone: lease.isADrone, is_static: lease.isStatic, is_active: lease.isActive });
    }

    batchDisable(ids: number[]) {
        return knex('devices').whereIn("device_id", ids).update({ is_active: false })
    }

    delete(id: number) {
        return knex('devices').where({ id }).del();
    }

    batchDelete(ids: number[]) {
        return knex('devices').whereIn("device_id", ids).del();
    }

    findById(id: number): any {
        return knex('devices').select('*').where({ id });
    }

    getAllElements(show_not_active: any) {
        if(show_not_active == false)
            return knex('devices').select('*');
        else
            return knex('devices').select('*').where({ is_active: true });
    }

    findByMac(mac_address: string) {
        return knex('devices').where({ mac_address }).select('*');
    }
}