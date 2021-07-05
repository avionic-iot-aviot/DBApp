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

    updateCopterId(ip: string, copter_id: string) {
        return knex('devices').where({ ip }).update({ copter_id });
    }

    updateIP(mac_address: string, ip: string) {
        return knex('devices').where({ mac_address }).update({ ip, is_active: true });
    }

    updateDevice(lease: ILeases) {
        return knex('devices').where({ mac_address: lease.mac }).update({ ip: lease.ip, is_device: lease.isADevice, is_static: lease.isStatic, is_active: lease.isActive });
    }

    batchDisable(ids: number[]) {
        return knex('devices').whereIn("device_id", ids).update({ is_active: false })
    }

    delete(device_id: any) {
        return knex('devices').where({ device_id }).del();
    }

    batchDelete(ids: number[]) {
        return knex('devices').whereIn("device_id", ids).del();
    }

    findById(device_id: number): any {
        return knex('devices').select('*').where({ device_id });
    }

    findByIp(ip: string): any {
        return knex('devices').select('*').where({ ip });
    }

    getAllElements(show_not_active: any) {
        if(show_not_active !== undefined)
            return knex('devices').select('*');
        else
            return knex('devices').select('*').where({ is_active: true });
    }

    findByMac(mac_address: string) {
        return knex('devices').where({ mac_address }).select('*');
    }
}